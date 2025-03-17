import { EditObj, ObjectType } from '@/app/types';
import Modal from './Modal';

interface EditModalProps {
  isOpen: boolean;
  editObject: EditObj | null;
  setEditObject: React.Dispatch<React.SetStateAction<EditObj | null>>;
  handleEditObject: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  editObject,
  setEditObject,
  handleEditObject,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={() => setEditObject(null)} title='Edit Object'>
      {editObject && (
        <form
          className='mb-4'
          onSubmit={e => {
            e.preventDefault();
            handleEditObject();
          }}
        >
          <label className='block mb-2' htmlFor='name-edit'>
            Name
          </label>
          <input
            id='name-edit'
            type='text'
            placeholder='Name'
            value={editObject.name}
            onChange={e =>
              setEditObject({ ...editObject, name: e.target.value })
            }
            className='border p-2 rounded w-full mb-2'
          />
          <label className='block mb-2' htmlFor='description-edit'>
            Description
          </label>
          <textarea
            id='description-edit'
            placeholder='Description'
            value={editObject.description}
            onChange={e =>
              setEditObject({ ...editObject, description: e.target.value })
            }
            className='border p-2 rounded w-full mb-2'
          />
          <label className='block mb-2' htmlFor='type-edit'>
            Type
          </label>
          <select
            id='type-edit'
            value={editObject.type?.toLowerCase()}
            onChange={e =>
              setEditObject({
                ...editObject,
                type: e.target.value as ObjectType,
              })
            }
            className='border p-2 rounded w-full mb-4'
          >
            {Object.values(ObjectType).map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
          <div className='flex justify-end gap-4'>
            <button
              type='button'
              onClick={() => setEditObject(null)}
              className='bg-red-500 text-white px-4 py-2 rounded mt-4 ml-2'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded mt-4'
            >
              Save
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default EditModal;
