import { Obj } from '@/app/types';
import Card from '@/components/Card';

interface CardsProps {
  objects: Obj[];
  getObjectById: (id: string) => Obj | undefined;
  onDelete: (id: string) => void;
  onManageRelations: (id: string) => void;
}

const Cards: React.FC<CardsProps> = ({
  objects,
  getObjectById,
  onDelete,
  onManageRelations,
}) => {
  return (
    <section>
      <ul>
        {objects.map(obj => (
          <Card
            key={obj.id}
            obj={obj}
            getObjectById={getObjectById}
            onDelete={() => onDelete(obj.id)}
            onManageRelations={() => onManageRelations(obj.id)}
          />
        ))}
      </ul>
    </section>
  );
};

export default Cards;
