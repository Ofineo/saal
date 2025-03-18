import { useAppContext } from '@/app/context/AppContext';
import Autocomplete from './Autocomplete';
import Modal from './Modal';
import type { Obj } from '@/app/types';
import { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  currentObj: Obj['id'];
  setModalOpen: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function AutocompleteModal({
  isOpen,
  setModalOpen,
  currentObj,
}: ModalProps) {
  const { objects, handleItemsSearch, updateObject } = useAppContext();
  
  const [selected, setSelected] = useState<Obj | null>(null);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<Obj[]>([]);
  const [isAutoCompleteOpen, setIsAutocompleteOpen] = useState(false);

  const handleSelect = (obj: Obj) => {
    setSelected(obj);
  };

  const handleSaveRelation = () => {
    if (!selected) return;
    const updatedObj = objects.find(obj => obj.id === currentObj);
    if (!updatedObj) return;

    if (!updatedObj.relations.includes(selected.id)) {
      const newObject = {
        ...updatedObj,
        relations: [...updatedObj.relations, selected.id],
      };
      updateObject(newObject);
    }

    setModalOpen(null);
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    if (value.trim()) {
      const fetchedSuggestions = await handleItemsSearch(value);
      setSuggestions(
        fetchedSuggestions?.filter(obj => obj.id !== currentObj) || []
      );
      setIsAutocompleteOpen(true);
    } else {
      setIsAutocompleteOpen(false);
    }
  };
  
  const handleCancel = () => {
    setModalOpen(null);
    setInput('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setModalOpen(null)}
      title='Manage Relations'
    >
      <Autocomplete
        onSelect={handleSelect}
        input={input}
        setInput={setInput}
        isOpen={isAutoCompleteOpen}
        setIsOpen={setIsAutocompleteOpen}
        handleInputChange={handleInputChange}
        suggestions={suggestions}
      />
      <div className='flex justify-end gap-4'>
        <button
          onClick={handleCancel}
          className='bg-red-500 text-white px-4 py-2 rounded mt-4 ml-2'
        >
          Cancel
        </button>
        <button
          onClick={handleSaveRelation}
          className='bg-blue-500 text-white px-4 py-2 rounded mt-4'
        >
          Save Relation
        </button>
      </div>
    </Modal>
  );
};
