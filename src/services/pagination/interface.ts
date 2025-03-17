export interface PaginationResult<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginationOptions {
  page: number;
  itemsPerPage: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  filter?: Record<string, any>;
}

export interface PaginationService<T> {
  getPage: (options: PaginationOptions) => Promise<PaginationResult<T>>;
  getTotalItems: (filter?: Record<string, any>) => Promise<number>;
  saveState: (options: PaginationOptions) => Promise<void>;
  loadState: () => Promise<PaginationOptions | null>;
}
