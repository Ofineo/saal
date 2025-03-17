interface CardProps {
  name: string;
  description: string;
  type: string;
  relations: string[];
  onDelete: () => void;
  onManageRelations: () => void;
  getObjectById: (id: string) => { name: string } | undefined;
}

const Card: React.FC<CardProps> = ({
  name,
  description,
  type,
  relations,
  onDelete,
  onManageRelations,
  getObjectById,
}) => {
  return (
    <li className='border p-2 mb-2 rounded'>
      <div className='mb-2 w-full'>
        <label className='block text-sm font-medium text-gray-700'>Name</label>
        <div className='flex items-center gap-2 border p-1 rounded w-full bg-gray-50'>
          <span>{name}</span>
        </div>
      </div>
      <div className='mb-2 w-full'>
        <label className='block text-sm font-medium text-gray-700'>
          Description
        </label>
        <div className='flex items-center gap-2 border p-1 rounded w-full bg-gray-50'>
          <span>{description}</span>
        </div>
      </div>
      <div className='mb-2 w-full'>
        <label className='block text-sm font-medium text-gray-700'>Type</label>
        <div className='flex items-center gap-2 border p-1 rounded w-full bg-gray-50'>
          <span>{type}</span>
        </div>
      </div>
      <div className='mb-2 w-full'>
        <label className='block text-sm font-medium text-gray-700'>
          Relations
        </label>
        {relations.length > 0 ? (
          <div className='flex flex-wrap gap-2 border p-1 rounded mb-2 w-full bg-gray-50'>
            {relations.map(relationId => {
              const relatedObj = getObjectById(relationId);
              return relatedObj ? (
                <span
                  key={relationId}
                  className='bg-blue-500 text-white py-1 px-3 rounded-full text-sm'
                >
                  {relatedObj.name}
                </span>
              ) : null;
            })}
          </div>
        ) : (
          <div className='border p-1 rounded mb-2 w-full bg-gray-50'>
            <p>No relations</p>
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
  );
};

export default Card;
