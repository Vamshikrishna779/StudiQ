import { StorageManager } from './storageUtils';
import { supabase } from '../../utils/apiClient';

export class DownloadManager {
  static async downloadContent(contentId) {
    try {
      // 1. Get content metadata
      const { data: content } = await supabase
        .from('learning_content')
        .select('*')
        .eq('id', contentId)
        .single();

      if (!content) throw new Error('Content not found');

      // 2. Check storage space
      const { quota, usage } = await StorageManager.getQuota();
      const contentSize = content.estimated_size || 5 * 1024 * 1024; // Default 5MB
      
      if (quota > 0 && usage + contentSize > quota * 0.8) {
        throw new Error('Insufficient storage space');
      }

      // 3. Download and cache
      const cacheKey = `content-${contentId}`;
      const assetsToCache = [
        content.main_file_url,
        ...(content.additional_files || [])
      ];

      const cache = await caches.open('learning-content-v1');
      await Promise.all(
        assetsToCache.map(async (url) => {
          const response = await fetch(url);
          await cache.put(url, response);
        })
      );

      // 4. Store metadata in IndexedDB
      await StorageManager.storeLearningMaterials({
        id: contentId,
        type: content.type,
        title: content.title,
        subject: content.subject,
        level: content.level,
        last_accessed: new Date().toISOString(),
        assets: assetsToCache
      });

      return { success: true, content };
    } catch (error) {
      console.error('Download failed:', error);
      return { success: false, error: error.message };
    }
  }

  static async getDownloadedContent() {
    return new Promise((resolve) => {
      const dbRequest = indexedDB.open('LearningMaterialsDB', 1);
      
      dbRequest.onsuccess = (event) => {
        const db = event.target.result;
        const tx = db.transaction('materials', 'readonly');
        const store = tx.objectStore('materials');
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => resolve([]);
      };

      dbRequest.onerror = () => resolve([]);
    });
  }

  static async deleteContent(contentId) {
    try {
      // 1. Get cached assets
      const content = (await this.getDownloadedContent()).find(
        (item) => item.id === contentId
      );

      if (!content) return { success: false };

      // 2. Delete from cache
      const cache = await caches.open('learning-content-v1');
      await Promise.all(
        content.assets.map((url) => cache.delete(url))
      );

      // 3. Delete from IndexedDB
      const dbRequest = indexedDB.open('LearningMaterialsDB', 1);
      
      await new Promise((resolve) => {
        dbRequest.onsuccess = (event) => {
          const db = event.target.result;
          const tx = db.transaction('materials', 'readwrite');
          tx.objectStore('materials').delete(contentId);
          tx.oncomplete = () => resolve();
        };
      });

      return { success: true };
    } catch (error) {
      console.error('Deletion failed:', error);
      return { success: false, error: error.message };
    }
  }
}