import { SortBy } from '@/app/types';
import { PaginationOptions, PaginationResult, PaginationService } from '../interface';
import type { StorageService } from '@/services/storage/interface';

export class LocalStoragePaginator<T extends { id: string }> implements PaginationService<T> {
  private readonly stateKey: string;

  constructor(
    private storageService: StorageService<T>,
    private key: string
  ) {
    this.stateKey = `${key}_pagination_state`;
  }

  async getPage(options: PaginationOptions): Promise<PaginationResult<T>> {
    const { page, itemsPerPage, sortBy, sortDirection, filter } = options;
    
    // Save the current pagination state
    await this.saveState(options);
    
    // Get all items from storage
    let allItems = await this.storageService.getAll();
    
    // Apply filtering if provided
    if (filter) {
      allItems = this.applyFilter(allItems, filter);
    }
    
    // Apply sorting if provided
    if (sortBy) {
      allItems = this.applySorting(allItems, sortBy, sortDirection || 'asc');
    }
    
    // Calculate pagination values
    const totalItems = allItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentPage = Math.max(1, Math.min(page, totalPages || 1));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    
    // Get items for the current page
    const items = allItems.slice(startIndex, endIndex);
    
    return {
      items,
      totalItems,
      currentPage,
      itemsPerPage,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1
    };
  }

  async getTotalItems(filter?: Record<string, any>): Promise<number> {
    const allItems = await this.storageService.getAll();
    
    if (filter) {
      return this.applyFilter(allItems, filter).length;
    }
    
    return allItems.length;
  }

  async saveState(options: PaginationOptions): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.stateKey, JSON.stringify(options));
    }
  }

  async loadState(): Promise<PaginationOptions | null> {
    if (typeof window === 'undefined') return null;
    
    const savedState = localStorage.getItem(this.stateKey);
    if (!savedState) return null;
    
    try {
      return JSON.parse(savedState) as PaginationOptions;
    } catch (error) {
      console.error('Failed to parse pagination state:', error);
      return null;
    }
  }

  private applyFilter(items: T[], filter: Record<string, any>): T[] {
    return items.filter(item => {
      return Object.entries(filter).every(([key, value]) => {
        if (value === undefined || value === null) return true;
        
        // Handle string search (case insensitive)
        if (typeof value === 'string' && typeof (item as any)[key] === 'string') {
          return (item as any)[key].toLowerCase().includes(value.toLowerCase());
        }
        
        // Handle exact match
        return (item as any)[key] === value;
      });
    });
  }

  private applySorting(items: T[], sortBy: string, direction: SortBy): T[] {
    return [...items].sort((a, b) => {
      const valueA = (a as any)[sortBy];
      const valueB = (b as any)[sortBy];
      
      // Handle string comparison
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        const comparison = valueA.localeCompare(valueB);
        return direction === 'asc' ? comparison : -comparison;
      }
      
      // Handle number comparison
      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }
}

export function createLocalStoragePaginator<T extends { id: string }>(
  storageService: StorageService<T>,
  key: string
): PaginationService<T> {
  return new LocalStoragePaginator<T>(storageService, key);
}