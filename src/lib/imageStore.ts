// Map screenshots are too large for localStorage, so they live in IndexedDB.
const DB = "df-wp";
const STORE = "map-images";

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function tx<T>(mode: IDBTransactionMode, run: (s: IDBObjectStore) => IDBRequest): Promise<T> {
  const db = await open();
  return new Promise<T>((resolve, reject) => {
    const req = run(db.transaction(STORE, mode).objectStore(STORE));
    req.onsuccess = () => resolve(req.result as T);
    req.onerror = () => reject(req.error);
  }).finally(() => db.close());
}

export const getImage = (key: string) => tx<Blob | undefined>("readonly", (s) => s.get(key)).catch(() => undefined);
export const putImage = (key: string, blob: Blob) => tx<IDBValidKey>("readwrite", (s) => s.put(blob, key));
export const deleteImage = (key: string) => tx<undefined>("readwrite", (s) => s.delete(key));

/** Downscale large screenshots so storage and PNG export stay fast. */
export async function shrinkImage(file: Blob, max = 2048): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
  if (scale === 1 && file.size < 3_000_000) return file;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("encode"))), "image/jpeg", 0.88));
}
