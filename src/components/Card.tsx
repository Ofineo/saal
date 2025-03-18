import { useAppContext } from '@/app/context/AppContext';
import { Obj } from '@/app/types';
import React, { useState } from 'react';
import AutocompleteModal from './AutocompleteModal';

interface CardProps {
  obj: Obj;
  onDelete: () => void;
  onManageRelations: () => void;
  getObjectById: (id: string) => Obj | undefined;
}

const AddRelationBtn = ({
  setAutocompleteModalOpen,
  objId,
}: {
  setAutocompleteModalOpen: React.Dispatch<React.SetStateAction<string | null>>;
  objId: string;
}) => {
  return (
    <button
      className='border-2 border-solid rounded-full ml-auto'
      onClick={() => setAutocompleteModalOpen(objId)}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='size-6 inline-block p-0.5'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 5v14m-7-7h14'
        />
      </svg>
    </button>
  );
};

export default function Card({
  obj,
  onDelete,
  onManageRelations,
  getObjectById,
}: CardProps) {
  const { objects, updateObject } = useAppContext();

  const [autocompleteModalOpen, setAutocompleteModalOpen] = useState<
    string | null
  >(null);

  const handleRemoveRelation = (currentObj: Obj, relation: Obj) => {
    const updatedObjects = objects.map(obj => {
      if (obj.id === relation.id) {
        obj.relations = obj.relations.filter(r => r !== currentObj.id);
      }
      if (obj.id === currentObj.id) {
        obj.relations = obj.relations.filter(r => r !== relation.id);
      }
      return obj;
    });
    updateObject(updatedObjects.find(obj => obj.id === relation.id)!);
    updateObject(updatedObjects.find(obj => obj.id === currentObj.id)!);
  };

  return (
    <>
      <li className='border p-2 mb-2 rounded'>
        <div className='mb-2 w-full'>
          <label className='block text-sm font-medium text-gray-700'>
            Name
          </label>
          <div className='flex items-center gap-2 border p-1 rounded w-full bg-gray-50'>
            <span>{obj.name}</span>
          </div>
        </div>
        <div className='mb-2 w-full'>
          <label className='block text-sm font-medium text-gray-700'>
            Description
          </label>
          <div className='flex items-center gap-2 border p-1 rounded w-full bg-gray-50'>
            <span>{obj.description}</span>
          </div>
        </div>
        <div className='mb-2 w-full'>
          <label className='block text-sm font-medium text-gray-700'>
            Type
          </label>
          <div className='flex items-center gap-2 border p-1 rounded w-full bg-gray-50'>
            <span>{obj.type}</span>
          </div>
        </div>
        <div className='mb-2 w-full'>
          <label className='block text-sm font-medium text-gray-700'>
            Relations
          </label>
          {obj.relations.length > 0 ? (
            <div className='flex flex-wrap gap-2 border p-1 rounded mb-2 w-full bg-gray-50'>
              {obj.relations.map(relationId => {
                const relatedObj = getObjectById(relationId);
                return relatedObj ? (
                  <React.Fragment key={relationId}>
                    <button
                      className='bg-blue-500 text-white px-3 rounded-full text-sm inline-block'
                      onClick={() => handleRemoveRelation(obj, relatedObj)}
                    >
                      <span>{relatedObj.name}</span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='size-6 inline-block ml-1'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M6 18 18 6M6 6l12 12'
                        />
                      </svg>
                    </button>
                  </React.Fragment>
                ) : null;
              })}
              <AddRelationBtn
                setAutocompleteModalOpen={setAutocompleteModalOpen}
                objId={obj.id}
              />
            </div>
          ) : (
            <div className='flex flex-wrap gap-2 border p-1 rounded mb-2 w-full bg-gray-50'>
              <span className='border px-1 rounded bg-gray-50'>
                <p>No relations</p>
              </span>
              <AddRelationBtn
                setAutocompleteModalOpen={setAutocompleteModalOpen}
                objId={obj.id}
              />
            </div>
          )}
        </div>
        <div className='flex gap-4 justify-end'>
          <button
            onClick={onDelete}
            className='w-50 bg-red-500 text-white px-2 rounded'
          >
            Delete Object
          </button>
          <button
            onClick={onManageRelations}
            className='w-50 bg-yellow-500 text-white px-2 rounded'
          >
            Manage Relations
          </button>
        </div>
      </li>
      <AutocompleteModal
        currentObj={obj.id}
        setModalOpen={setAutocompleteModalOpen}
        isOpen={!!autocompleteModalOpen}
      />
    </>
  );
};
