import Modal from './Modal';
import type { Obj } from '@/app/types';

interface DeleteModalProps {
  isOpen: boolean;
  objectDetails: Obj | undefined;
  handleDelete: () => void;
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<string | null>>;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  objectDetails,
  handleDelete,
  setDeleteModalOpen,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={() => setDeleteModalOpen(null)} title='Are you sure you want to delete the Object?'>
      {objectDetails && (
        <>
          <div>Name: {objectDetails.name}</div>
          <div>Description: {objectDetails.description}</div>
          <div className='flex gap-4 justify-end'>
            <button
              onClick={() => setDeleteModalOpen(null)}
              className='bg-red-500 text-white px-4 py-2 rounded mt-4 ml-2'
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className='bg-blue-500 text-white px-4 py-2 rounded mt-4'
            >
              Delete
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default DeleteModal;
