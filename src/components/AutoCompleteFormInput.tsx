import React, { useState, useEffect, useRef } from 'react';
import type { Obj } from '@/app/types';

type AutocompleteInputProps = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  suggestions: Obj[];
  onSelect: (currentObj: Obj, obj: Obj) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentObj: Obj;
};

export default function AutocompleteInput({
  input,
  setInput,
  suggestions,
  onSelect,
  handleInputChange,
  currentObj,
}: AutocompleteInputProps) {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex(prev => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex(
        prev => (prev - 1 + suggestions.length) % suggestions.length
      );
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      onSelect(currentObj, suggestions[highlightedIndex]);
    } else if (e.key === 'Escape') {
      setInput('');
    }
  };

  const handleSelect = (obj: Obj) => {
    setInput(obj.name);
    onSelect(currentObj, obj);
  };

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [input]);

  return (
    <div ref={wrapperRef} className='relative'>
      <input
        type='text'
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className='w-full p-1 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
        placeholder='Search objects...'
      />
      {input && suggestions.length > 0 && (
        <ul className='absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg max-h-60 overflow-y-auto'>
          {suggestions.map((obj, index) => (
            <li
              key={obj.id}
              onClick={() => handleSelect(obj)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`p-2 cursor-pointer ${
                highlightedIndex === index
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {obj.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
