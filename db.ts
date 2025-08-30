// --- IndexedDB Helper Functions ---
const DB_NAME = 'AmarasteAppDB';
const DB_VERSION = 1;
const STORE_NAME = 'assetStore';

const openDb = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => reject((event.target as IDBRequest).error);
    request.onsuccess = (event) => resolve((event.target as IDBRequest).result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
};

export const saveAssetToDb = async (file: File, pageKey: string): Promise<void> => {
  const db = await openDb();
  const asset = {
    id: pageKey,
    filename: file.name,
    page_key: pageKey,
    data: file, // Store the blob/file itself
    created_at: new Date().toISOString(),
  };

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(asset, pageKey); // Use pageKey as the key

    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
};

export const loadAssetFromDb = async (pageKey: string): Promise<Blob | null> => {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(pageKey);

    transaction.oncomplete = () => {
      db.close();
      const result = request.result;
      if (result && result.data instanceof Blob) {
          resolve(result.data);
      } else {
          resolve(null);
      }
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
};

export const removeAssetFromDb = async (pageKey: string): Promise<void> => {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.delete(pageKey);

    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
};
