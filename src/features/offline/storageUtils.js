export const StorageManager = {
  // Check storage quota (important for low-end devices)
  async getQuota() {
    if (navigator.storage && navigator.storage.estimate) {
      const { quota, usage } = await navigator.storage.estimate();
      return { quota, usage };
    }
    return { quota: 0, usage: 0 };
  },

  // Cache API responses for offline use
  async cacheResponse(url, data) {
    const cache = await caches.open('ai-tutor-v1');
    await cache.put(url, new Response(JSON.stringify(data)));
  },

  // Get cached data with network fallback
  async getWithCache(url) {
    try {
      // Try network first
      const networkResponse = await fetch(url);
      this.cacheResponse(url, await networkResponse.clone().json());
      return networkResponse.json();
    } catch {
      // Fallback to cache
      const cache = await caches.open('ai-tutor-v1');
      const cached = await cache.match(url);
      return cached ? cached.json() : null;
    }
  },

  // For storing essential learning materials
  async storeLearningMaterials(materials) {
    const { quota } = await this.getQuota();
    const estimatedSize = new Blob([JSON.stringify(materials)]).size;
    
    if (quota > 0 && estimatedSize < quota * 0.5) {
      // Using IndexedDB for structured data
      const dbRequest = indexedDB.open('LearningMaterialsDB', 1);
      
      dbRequest.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('materials')) {
          db.createObjectStore('materials', { keyPath: 'id' });
        }
      };

      return new Promise((resolve) => {
        dbRequest.onsuccess = (event) => {
          const db = event.target.result;
          const tx = db.transaction('materials', 'readwrite');
          materials.forEach(item => tx.objectStore('materials').put(item));
          tx.oncomplete = () => resolve(true);
        };
      });
    }
    return false;
  }
};