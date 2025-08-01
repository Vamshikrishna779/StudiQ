import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl'; // or CPU backend for low-end devices

// Lightweight model for offline AI tutor
export class AIModel {
  static model = null;

  static async load() {
    if (!this.model) {
      // Load from local IndexedDB if available
      const handlers = tf.io.getSaveHandlers('indexeddb://ai-tutor-model');
      
      if (handlers.length > 0) {
        this.model = await tf.loadLayersModel(handlers[0]);
      } else {
        // First-time download (small ~2MB model)
        this.model = await tf.loadLayersModel(
          '/models/ai-tutor/model.json'
        );
        await this.model.save('indexeddb://ai-tutor-model');
      }
    }
    return this.model;
  }

  static async predict(inputText) {
    const model = await this.load();
    // Simple text embedding - replace with your actual preprocessing
    const inputTensor = tf.tensor2d([[...yourTextToVectorFunction(inputText)]]);
    const prediction = model.predict(inputTensor);
    return prediction.arraySync()[0];
  }
}

// For offline availability
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log('AI Model: Offline support enabled'));
}