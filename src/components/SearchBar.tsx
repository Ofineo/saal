interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  handleShowForm: () => void;
  showForm: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  setQuery,
  handleShowForm,
  showForm,
}) => {
  return (
    <div className='flex justify-between items-center mb-10 gap-6'>
      <input
        type='text'
        placeholder='Search name or description...'
        value={query}
        onChange={e => setQuery(e.target.value)}
        className='border p-2 rounded w-full'
      />
      <button onClick={handleShowForm} className='relative'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className={`absolute size-6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
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
          className={`absolute size-6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
            showForm ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
          />
        </svg>
        <span className='absolute inline-block top-1/2 transform -translate-x-2/2 -translate-y-1/2 ml-4 hidden md:block'>
          {showForm ? 'Cancel' : 'Add'}
        </span>
      </button>
    </div>
  );
};

export default SearchBar;
