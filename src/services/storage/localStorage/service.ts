import type { StorageService } from '../interface';

export class LocalStorageService<T extends { id: string }>
  implements StorageService<T>
{
  constructor(private key: string) {}

  async getAll(): Promise<T[]> {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(this.key);
    return saved ? JSON.parse(saved) : [];
  }

  async getById(id: string): Promise<T | undefined> {
    const allItems = await this.getAll();
    return allItems.find(item => item.id === id);
  }

  async create(item: T): Promise<void> {
    const allItems = await this.getAll();
    allItems.push(item);
    this.saveAll(allItems);
  }

  async update(item: T): Promise<void> {
    const allItems = await this.getAll();
    const index = allItems.findIndex(i => i.id === item.id);
    if (index !== -1) {
      allItems[index] = item;
      this.saveAll(allItems);
    }
  }

  async delete(id: string): Promise<void> {
    const allItems = await this.getAll();
    const updatedItems = allItems.filter(item => item.id !== id);
    this.saveAll(updatedItems);
  }

  private saveAll(data: T[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.key, JSON.stringify(data));
    }
  }
}

export function createLocalStorageService<T extends { id: string }>(
  key: string
): StorageService<T> {
  return new LocalStorageService<T>(key);
}