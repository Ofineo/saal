import Modal from './Modal';
import type { Obj } from '@/app/types';

interface ManageRelationsModalProps {
  isOpen: boolean;
  objects: Obj[];
  selectedRelations: string[];
  handleRelationSelect: (relationId: string) => void;
  handleSaveRelations: () => void;
  setRelationModalOpen: React.Dispatch<React.SetStateAction<string | null>>;
}

const ManageRelationsModal: React.FC<ManageRelationsModalProps> = ({
  isOpen,
  objects,
  selectedRelations,
  handleRelationSelect,
  handleSaveRelations,
  setRelationModalOpen,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setRelationModalOpen(null)}
      title='Manage Relations'
    >
      {objects
        .filter(obj => obj.id !== null)
        .map(obj => (
          <div key={obj.id} className='mb-2'>
            <input
              type='checkbox'
              checked={selectedRelations.includes(obj.id)}
              onChange={() => handleRelationSelect(obj.id)}
            />
            <label className='ml-2'>{obj.name}</label>
          </div>
        ))}
      <div className='flex justify-end gap-4'>
        <button
          onClick={() => setRelationModalOpen(null)}
          className='bg-red-500 text-white px-4 py-2 rounded mt-4 ml-2'
        >
          Cancel
        </button>
        <button
          onClick={handleSaveRelations}
          className='bg-blue-500 text-white px-4 py-2 rounded mt-4'
        >
          Save Relations
        </button>
      </div>
    </Modal>
  );
};

export default ManageRelationsModal;
