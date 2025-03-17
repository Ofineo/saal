import { Obj, ObjectType } from '@/app/types';

interface AddObjectFormProps {
  newObj: Omit<Obj, 'id'>;
  setNewObj: (newObj: Omit<Obj, 'id'>) => void;
  handleAdd: () => void;
  handleCancel: () => void;
}

const AddObjectForm: React.FC<AddObjectFormProps> = ({
  newObj,
  setNewObj,
  handleAdd,
  handleCancel,
}: AddObjectFormProps) => {
  return (
    <form
      className='mb-4'
      onSubmit={e => {
        e.preventDefault();
        handleAdd();
      }}
    >
      <label className='block mb-2' htmlFor='name-add'>
        Name
      </label>
      <input
        id='name-add'
        type='text'
        placeholder='Name'
        value={newObj.name}
        onChange={e => setNewObj({ ...newObj, name: e.target.value })}
        className='border p-2 rounded w-full mb-2'
      />
      <label className='block mb-2' htmlFor='description-add'>
        Description
      </label>
      <textarea
        id='description-add'
        placeholder='Description'
        value={newObj.description}
        onChange={e => setNewObj({ ...newObj, description: e.target.value })}
        className='border p-2 rounded w-full mb-2'
      />
      <label className='block mb-2' htmlFor='type-add'>
        Type
      </label>
      <select
        id='type-add'
        value={newObj.type}
        onChange={e =>
          setNewObj({ ...newObj, type: e.target.value as ObjectType })
        }
        className='border p-2 rounded w-full mb-4'
      >
        {Object.values(ObjectType).map(type => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>

      <div className='grid grid-cols-1 gap-4 mb-10 grid-cols-2'>
        <button
          type='button'
          onClick={handleCancel}
          className='bg-red-500 text-white p-2 rounded w-full'
        >
          Cancel
        </button>
        <button
          type='submit'
          className='bg-blue-500 text-white p-2 rounded w-full'
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddObjectForm;
