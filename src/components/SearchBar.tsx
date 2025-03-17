import { useAppContext } from '@/app/context/AppContext';
import Autocomplete from './Autocomplete';
import type { Obj } from '@/app/types';
import { useState } from 'react';

interface SearchBarProps {
  setFiltered: React.Dispatch<React.SetStateAction<Obj[]>>;
  handleShowForm: () => void;
  showForm: boolean;
  reset: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  setFiltered,
  handleShowForm,
  showForm,
  reset,
}) => {
  const { handleItemsSearch } = useAppContext();
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<Obj[]>([]);
  const [isAutoCompleteOpen, setIsAutocompleteOpen] = useState(false);

  const handleSelect = (obj: Obj) => {
    setFiltered([obj]);
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    if (value.trim()) {
      const fetchedSuggestions = await handleItemsSearch(value);
      setSuggestions(fetchedSuggestions || []);
      setIsAutocompleteOpen(true);
    } else {
      setIsAutocompleteOpen(false);
    }
  };
  
  return (
    <>
      <div className='flex justify-between items-center mb-10 gap-6'>
        <Autocomplete
          onSelect={handleSelect}
          input={input}
          setInput={setInput}
          isOpen={isAutoCompleteOpen}
          setIsOpen={setIsAutocompleteOpen}
          handleInputChange={handleInputChange}
          suggestions={suggestions}
        />
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6'
          onClick={() => {
            reset();
            setInput('');
          }}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6 18 18 6M6 6l12 12'
          />
        </svg>
      </div>
      <div className='w-full mb-8'>
        <button
          onClick={handleShowForm}
          className='flex align-center relative min-w-40 bg-blue-500 p-2 rounded-full text-white'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={`size-6 inline absolute left-2 ${
              showForm ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
            />
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={`size-6 inline absolute left-2 ${
              showForm ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
            />
          </svg>
          <span className='inline relative left-10'>
            {showForm ? 'Cancel' : 'Add Object'}
          </span>
        </button>
      </div>
    </>
  );
};

export default SearchBar;
