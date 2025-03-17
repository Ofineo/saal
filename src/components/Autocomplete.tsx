import { useState, useRef, useEffect } from "react";
import type { Obj } from '@/app/types';

type AutocompleteProps = {
  onSelect: (value: Obj) => void;
  fetchSuggestions: (query: string, page?: number, itemsPerPage?: number) => Promise<Obj[] | undefined>
};

const Autocomplete = ({ onSelect, fetchSuggestions }: AutocompleteProps) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<Obj[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    if (value.trim()) {
      const fetchedSuggestions = await fetchSuggestions(value);
      setSuggestions(fetchedSuggestions || []);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleSelect = (obj: Obj) => {
    setInput(obj.name);
    setIsOpen(false);
    onSelect(obj);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      handleSelect(suggestions[highlightedIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-64">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search objects..."
      />

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg">
          {suggestions.map((obj, index) => (
            <li
              key={obj.id}
              onClick={() => handleSelect(obj)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`p-2 cursor-pointer ${
                highlightedIndex === index ? "bg-blue-500 text-white" : "hover:bg-gray-100"
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

export default Autocomplete;
