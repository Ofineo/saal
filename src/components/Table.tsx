import type { Obj } from '@/app/types';

interface TableProps {
  data: Obj[];
  getObjectById: (id: string) => Obj | undefined;
  showActions: string | null;
  setShowActions: (id: string | null) => void;
  handleDeleteModalOpen: (id: string) => void;
  handleManageRelations: (id: string) => void;
  handleEditModalOpen: (id: string) => void;
}

const Table = ({
  data,
  getObjectById,
  showActions,
  setShowActions,
  handleDeleteModalOpen,
  handleManageRelations,
  handleEditModalOpen,
}: TableProps) => {
  return (
    <section className='overflow-x-auto'>
      <table className='min-w-full table-auto mb-40'>
        <thead>
          <tr>
            <th className='text-left'>Name</th>
            <th className='text-left'>Description</th>
            <th className='text-left'>Type</th>
            <th className='text-left'>Relations</th>
            <th className=''>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(obj => (
            <tr key={obj.id}>
              <td>
                <div className='flex items-center gap-2'>{obj.name}</div>
              </td>
              <td>
                <div className='flex items-center gap-2'>{obj.description}</div>
              </td>
              <td>
                <div className='flex items-center gap-2'>{obj.type}</div>
              </td>
              <td>
                {obj.relations.length > 0 ? (
                  <div className='flex flex-wrap gap-2'>
                    {obj.relations.map(relationId => {
                      const relatedObj = getObjectById(relationId);
                      return relatedObj ? (
                        <span
                          key={relationId}
                          className='text-center bg-blue-500 text-white py-1 px-3 rounded-full text-sm'
                        >
                          {relatedObj.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                ) : (
                  <p>No relations</p>
                )}
              </td>
              <td className='flex items-center justify-center'>
                <div className='relative'>
                  <button
                    onClick={() =>
                      setShowActions(showActions === obj.id ? null : obj.id)
                    }
                    className='bg-gray-200 text-black p-1 rounded relative'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      className={`absolute size-6 text-gray-600 transition-opacity delay-100 duration-400 ease-in-out ${
                        showActions === obj.id ? 'opacity-0' : 'opacity-100'
                      }`}
                    >
                      <circle cx='12' cy='5' r='1' />
                      <circle cx='12' cy='12' r='1' />
                      <circle cx='12' cy='19' r='1' />
                    </svg>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M6 18 18 6M6 6l12 12'
                        className={`absolute w-6 h-6 text-gray-600 transition-opacity delay-100 duration-400 ease-in-out ${
                          showActions === obj.id ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    </svg>
                  </button>
                  {showActions === obj.id && (
                    <div className='absolute right-0 top-100 w-40 bg-white border rounded shadow-lg z-10'>
                      <button
                        onClick={() => handleEditModalOpen(obj.id)}
                        className='w-full bg-gray-100 text-black text-left px-3 py-1 hover:bg-gray-300'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleManageRelations(obj.id)}
                        className='w-full bg-gray-100 text-black text-left px-3 py-1 hover:bg-gray-300'
                      >
                        Manage Relations
                      </button>
                      <button
                        onClick={() => handleDeleteModalOpen(obj.id)}
                        className='w-full bg-gray-100 text-black text-left px-3 py-1 hover:bg-gray-300'
                      >
                        Delete Object
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Table;
