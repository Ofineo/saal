'use client';

import React, { useState, useContext, createContext, useEffect } from 'react';

import {
  createLocalStoragePaginator,
  createLocalStorageService,
  PaginationOptions,
  PaginationResult,
} from '@/services';
import type { AppContextType, Obj, SortBy } from '../types';
import { isLocalStorageSeeded, seedLocalStorage } from '../helpers';

export const storageService = createLocalStorageService<Obj>('objects');

export const paginator = createLocalStoragePaginator<Obj>(
  storageService,
  'my-pagination-key'
);

const AppContext = createContext<AppContextType | undefined>(undefined);

// Custom hook for accessing the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error('useAppContext must be used within an AppProvider');
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [objects, setObjects] = useState<Obj[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [paginationState, setPaginationState] =
    useState<PaginationResult<Obj> | null>(null);
  const [paginationOptions, setPaginationOptions] = useState<PaginationOptions>(
    {
      page: 1,
      itemsPerPage: 5,
      sortBy: 'name',
      sortDirection: 'asc',
      filter: {},
    }
  );

  useEffect(() => {
    // Load pagination state from localStorage on initial render
    const loadPaginationState = async () => {
      const savedState = await paginator.loadState();
      if (savedState) {
        setPaginationOptions(savedState);
      }
    };
    loadPaginationState();
  }, []);

  useEffect(() => {
    const fetchPaginatedObjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await paginator.getPage(paginationOptions);
        setPaginationState(result);
        setObjects(result.items);
      } catch (err) {
        console.error(err);
        setError('Failed to load objects');
      } finally {
        setLoading(false);
      }
    };
    fetchPaginatedObjects();
  }, [paginationOptions]);

  const seedObjects = async () => {
    // Seed localStorage if not already seeded
    if (objects.length === 0 && !isLocalStorageSeeded()) {
      seedLocalStorage();
    }
    if (isLocalStorageSeeded()) {
      const result = await paginator.getPage(paginationOptions);
      setPaginationState(result);
      setObjects(result.items);
    }
  };

  const addObject = async (obj: Obj) => {
    setLoading(true);
    setError(null);
    try {
      await storageService.create(obj);
      const result = await paginator.getPage(paginationOptions);
      setPaginationState(result);
      setObjects(result.items);
    } catch (err) {
      console.error(err);
      setError('Failed to add object');
    } finally {
      setLoading(false);
    }
  };

  const updateObject = async (updatedObj: Obj) => {
    setLoading(true);
    setError(null);
    try {
      await storageService.update(updatedObj);

      const result = await paginator.getPage(paginationOptions);
      setPaginationState(result);
      setObjects(result.items);
    } catch (err) {
      console.error(err);
      setError('Failed to update object');
    } finally {
      setLoading(false);
    }
  };

  const deleteObject = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await storageService.delete(id);

      const result = await paginator.getPage(paginationOptions);
      setPaginationState(result);
      setObjects(result.items);
    } catch (err) {
      console.error(err);
      setError('Failed to delete object');
    } finally {
      setLoading(false);
    }
  };

  const getObjectById = (id: string) => {
    return objects.find(obj => obj.id === id);
  };

  const handlePageChange = (newPage: number) => {
    setPaginationOptions(prev => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setPaginationOptions(prev => ({
      ...prev,
      itemsPerPage: newItemsPerPage,
      page: 1,
    }));
  };

  const handleSortChange = (sortBy: string, sortDirection: SortBy) => {
    setPaginationOptions(prev => ({
      ...prev,
      sortBy,
      sortDirection,
      page: 1,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        objects,
        addObject,
        updateObject,
        deleteObject,
        getObjectById,
        loading,
        error,
        seedObjects,
        pagination: paginationState,
        paginationOptions,
        handlePageChange,
        handleItemsPerPageChange,
        handleSortChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;