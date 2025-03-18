import { useAppContext } from '@/app/context/AppContext';
import { Obj } from '@/app/types';
import React, { useState } from 'react';
import AutoCompleteFormInput from './AutoCompleteFormInput';

interface CardProps {
  obj: Obj;
  onDelete: () => void;
  onManageRelations: () => void;
  getObjectById: (id: string) => Obj | undefined;
}

const AddRelationBtn = ({
  setAutocompleteOpen,
  isAutocompleteOpen,
}: {
  setAutocompleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAutocompleteOpen: boolean;
}) => {
  return (
    <button
      className='border-2 border-solid rounded-full ml-auto'
      onClick={() => setAutocompleteOpen(!isAutocompleteOpen)}
    >
      {!isAutocompleteOpen ? (
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
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6 inline-block p-0.5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
        </svg>
      )}
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

  const [input, setInput] = useState('');
  const [isAutocompleteOpen, setAutocompleteOpen] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const filteredSuggestions = objects.filter(obj =>
    obj.name.toLowerCase().includes(input.toLowerCase())
  );

  const handleSelect = (currentObj: Obj, obj: Obj) => {
    // Add the selected relation to the current object
    if (!currentObj.relations.includes(obj.id)) {
      currentObj.relations.push(obj.id);
    }
    updateObject(currentObj);
    setInput('');
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
              {isAutocompleteOpen && (
                <AutoCompleteFormInput
                  input={input}
                  setInput={setInput}
                  suggestions={filteredSuggestions.filter(s => s.id !== obj.id)}
                  onSelect={handleSelect}
                  handleInputChange={handleInputChange}
                  currentObj={obj}
                />
              )}
              <AddRelationBtn
                setAutocompleteOpen={setAutocompleteOpen}
                isAutocompleteOpen={isAutocompleteOpen}
              />
            </div>
          ) : (
            <div className='flex flex-wrap gap-2 border p-1 rounded mb-2 w-full bg-gray-50'>
              <span className='border px-1 rounded bg-gray-50'>
                <p>No relations</p>
              </span>
              <AddRelationBtn
                setAutocompleteOpen={setAutocompleteOpen}
                isAutocompleteOpen={isAutocompleteOpen}
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
    </>
  );
};
