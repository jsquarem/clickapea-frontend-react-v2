import { memo } from 'react';
import { useDrag } from 'react-dnd';
import { GripVertical } from 'react-bootstrap-icons';

export const PlannerRecipes = memo(function PlannerRecipes({
  image,
  name,
  recipeID,
  type
}) {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { name, recipeID },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1
      })
    }),
    [name, type]
  );
  return (
    <div
      ref={drag}
      style={{
        border: '1px dashed gray',
        cursor: 'move',
        opacity
      }}
      data-testid="box"
      className="d-flex flex-row justify-content-start h-100 bg-light p-1"
    >
      <div>
        <GripVertical style={{ fontSize: '1.5rem' }} />
      </div>
      <div
        className="flex-grow-1 my-auto"
        style={{
          lineHeight: '1rem'
        }}
      >
        {name}
      </div>
      <div>
        <img
          alt={name}
          src={image}
          style={{ maxHeight: '30px', maxWidth: '40px' }}
        />
      </div>
    </div>
  );
});
