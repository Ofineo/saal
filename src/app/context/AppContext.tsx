'use client';

import React, { useState, useContext, createContext, useEffect } from 'react';

import { LocalStorageService, StorageService } from '@/services';
import type { AppContextType, Obj } from '../types';
import { isLocalStorageSeeded, seedLocalStorage } from '../helpers';

const storageService: StorageService<Obj> = new LocalStorageService<Obj>(
  'objects'
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

  useEffect(() => {
    // Fetch objects on initial render
    const fetchObjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await storageService.getAll();
        setObjects(data || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load objects');
      } finally {
        setLoading(false);
      }
    };
    fetchObjects();
  }, []);

  const seedObjects = async () => {
    // Seed localStorage if not already seeded
    if (objects.length === 0 && !isLocalStorageSeeded()) {
      seedLocalStorage();
    }
    if (isLocalStorageSeeded()) {
      setObjects(await storageService.getAll());
    }
  };

  const addObject = async (obj: Obj) => {
    setLoading(true);
    setError(null);
    try {
      await storageService.create(obj);
      setObjects(await storageService.getAll());
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
      setObjects(await storageService.getAll());
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
      setObjects(await storageService.getAll());
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;