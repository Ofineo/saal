'use client';

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { AddObjectForm, Cards, SearchBar, Table } from '@/components';
import { useAppContext } from './context/AppContext';
import { EditObj, Obj, ObjectType } from './types';
import EditModal from '@/components/EditModal';
import ManageRelationsModal from '@/components/ManageRelationsModal';
import DeleteModal from '@/components/DeleteModal';
import { useWindowSize } from './hooks';
import { DESKTOP_SIZE } from '@/constants';

const Home = () => {
  const {
    objects,
    addObject,
    updateObject,
    deleteObject,
    getObjectById,
    loading,
    error,
    seedObjects,
  } = useAppContext();
  const { width } = useWindowSize();

  const isDesktop = width && width >= DESKTOP_SIZE;

  const [formError, setFormError] = useState('');
  const [filtered, setFiltered] = useState(objects);
  const [showForm, setShowForm] = useState(false);
  const [newObj, setNewObj] = useState<Omit<Obj, 'id'>>({
    name: '',
    description: '',
    type: ObjectType.Human,
    relations: [],
  });
  const [selectedRelations, setSelectedRelations] = useState<string[]>([]);
  const [relationModalOpen, setRelationModalOpen] = useState<string | null>(
    null
  );
  const [deleteModalOpen, setDeleteModalOpen] = useState<string | null>(null);
  const [showCards, setShowCards] = useState(false);
  const [showActions, setShowActions] = useState<string | null>(null);
  const [editObject, setEditObject] = useState<EditObj | null>(null);

  const handleResetFilter = () => setFiltered(objects);

  // Handle adding new object with validation
  const handleAdd = () => {
    if (newObj.name.trim() && newObj.description.trim() && newObj.type.trim()) {
      const objToAdd: Obj = { id: uuidv4(), ...newObj, relations: [] };
      addObject(objToAdd);
      setNewObj({
        name: '',
        description: '',
        type: ObjectType.Human,
        relations: [],
      });
      setShowForm(false);
    } else {
      setFormError('All fields are required');
    }
  };

  const handleShowForm = (showForm: boolean) => setShowForm(showForm);

  const handleFormCancel = () => {
    handleShowForm(false);
    setFormError('');
  };

  const handleManageRelations = (objectId: string) => {
    setRelationModalOpen(objectId);
    setShowActions(null);
    const obj = objects.find(o => o.id === objectId);
    if (obj) setSelectedRelations(obj.relations);
  };

  const handleRelationSelect = (relationId: string) => {
    setSelectedRelations(prevRelations =>
      prevRelations.includes(relationId)
        ? prevRelations.filter(id => id !== relationId)
        : [...prevRelations, relationId]
    );
  };

  const handleSaveRelations = () => {
    const updatedObjects = objects.map(obj => {
      if (obj.id === relationModalOpen) {
        obj.relations = selectedRelations;
      }
      return obj;
    });
    updateObject(updatedObjects.find(obj => obj.id === relationModalOpen)!);
    setRelationModalOpen(null);
  };

  const handleEditModalOpen = (objectId: string) => {
    setEditObject(getObjectById(objectId)!);
    setShowActions(null);
  };

  const handleEditObject = () => {
    setShowActions(null);
    if (editObject) {
      updateObject(editObject as Obj);
      setEditObject(null);
    } else {
      setFormError('No object to edit');
    }
  };

  const handleDeleteModalOpen = (id: string) => {
    setDeleteModalOpen(id);
    setShowActions(null);
  };

  const tableOrCards =
    showCards || !isDesktop ? (
      <Cards
        objects={filtered}
        getObjectById={getObjectById}
        onDelete={handleDeleteModalOpen}
        onManageRelations={handleManageRelations}
      />
    ) : (
      <Table
        data={filtered}
        showActions={showActions}
        setShowActions={setShowActions}
        handleDeleteModalOpen={handleDeleteModalOpen}
        handleManageRelations={handleManageRelations}
        handleEditModalOpen={handleEditModalOpen}
      />
    );

  return (
    <main className='p-4 max-w-[950px] mx-auto'>
      <h1 className='text-2xl mb-4'>Object Management</h1>
      <SearchBar
        setFiltered={setFiltered}
        showForm={showForm}
        handleShowForm={() => setShowForm(!showForm)}
        reset={handleResetFilter}
      />

      <div className='text-red-500 mb-4'>{error || formError}</div>

      {showForm && (
        <AddObjectForm
          newObj={newObj}
          setNewObj={setNewObj}
          handleAdd={handleAdd}
          handleCancel={handleFormCancel}
        />
      )}

      {objects.length === 0 && (
        <div className='flex flex-col justify-start items-center h-screen'>
          <p>No objects found.</p>
          <p>Would you like to seed them</p>
          <button
            className='bg-blue-500 text-white px-2 rounded mt-4'
            onClick={seedObjects}
          >
            Seed Objects
          </button>
        </div>
      )}
      {objects.length > 0 && isDesktop && (
        <div>
          <button
            className='bg-yellow-500 text-white px-2 rounded mb-4'
            onClick={() => setShowCards(!showCards)}
          >
            Show {showCards ? 'Table' : 'Cards'}
          </button>
        </div>
      )}
      {loading && <p>Loading...</p>}
      {objects.length > 0 && tableOrCards}
      <EditModal
        isOpen={!!editObject?.id}
        editObject={editObject}
        setEditObject={setEditObject}
        handleEditObject={handleEditObject}
      />

      <ManageRelationsModal
        isOpen={!!relationModalOpen}
        objects={objects.filter(obj => obj.id !== relationModalOpen)}
        selectedRelations={selectedRelations}
        handleRelationSelect={handleRelationSelect}
        handleSaveRelations={handleSaveRelations}
        setRelationModalOpen={setRelationModalOpen}
      />

      <DeleteModal
        isOpen={!!deleteModalOpen}
        objectDetails={getObjectById(deleteModalOpen!)}
        handleDelete={() => {
          if (deleteModalOpen) {
            deleteObject(deleteModalOpen);
            setDeleteModalOpen(null);
          }
        }}
        setDeleteModalOpen={setDeleteModalOpen}
      />
    </main>
  );
};

export default Home;
