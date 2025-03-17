import { useAppContext } from '@/app/context/AppContext';
import { ITEMS_PER_PAGE } from '@/constants';

export function Pagination() {
  const { pagination, handlePageChange, handleItemsPerPageChange } =
    useAppContext();

  if (!pagination) return <></>;

  return (
    <div className='flex flex-col md:flex-row justify-between items-center mt-4 mb-40'>
      <div className='flex items-center mb-4'>
        <label className='mr-2'>Items per page:</label>
        <select
          value={pagination.itemsPerPage}
          onChange={e => handleItemsPerPageChange(Number(e.target.value))}
          className='border rounded p-1'
        >
          {ITEMS_PER_PAGE.map(itemsPerPage => (
            <option key={itemsPerPage} value={itemsPerPage}>
              {itemsPerPage}
            </option>
          ))}
        </select>
      </div>

      <div className='flex items-center'>
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={!pagination.hasPreviousPage}
          className={`py-1 px-3 rounded-full mr-2 text-white ${
            !pagination.hasPreviousPage
              ? 'bg-blue-100'
              : 'bg-blue-500 hover:bg-blue-400'
          }`}
        >
          Previous
        </button>
        <span>{`Page ${pagination.currentPage} of ${pagination.totalPages}`}</span>
        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={!pagination.hasNextPage}
          className={`py-1 px-3 rounded-full ml-2 text-white ${
            !pagination.hasNextPage
              ? 'bg-blue-100'
              : 'bg-blue-500 hover:bg-blue-400'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
