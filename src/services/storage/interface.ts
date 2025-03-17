export interface StorageService<T> {
  getAll: () => Promise<T[]>;
  getById: (id: string) => Promise<T | undefined>;
  create: (item: T) => Promise<void>;
  update: (item: T) => Promise<void>;
  delete: (id: string) => Promise<void>;
}
