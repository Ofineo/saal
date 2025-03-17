import Card from '@/components/Card';

interface CardsProps {
  objects: {
    id: string;
    name: string;
    description: string;
    type: string;
    relations: string[];
  }[];
  getObjectById: (id: string) => { name: string } | undefined;
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
            name={obj.name}
            description={obj.description}
            type={obj.type}
            relations={obj.relations}
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
