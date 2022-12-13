import { registerables } from 'chart.js';
import { memo, useEffect, useState } from 'react';
import { CartPlusFill, CartDashFill } from 'react-bootstrap-icons';
import { useDrop } from 'react-dnd';
import './PlannerCalendarDay.css';

export const PlannerCalendarDay = memo(function PlannerCalendarDay({
  accept,
  dayNumber,
  handleOnDrop,
  recipes,
  dateType,
  dayRecipeColors,
  shoppingList,
  setShoppingList
}) {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {}, [isSelected]);

  if (dateType === 'nextMonth') {
    accept = [''];
  }
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: handleOnDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  const isActive = isOver && canDrop;
  let backgroundColor = '';
  if (isActive) {
    backgroundColor = '#819ea5';
  } else if (canDrop) {
    backgroundColor = '#d5eff2';
  }
  const handleClick = (e) => {
    setIsSelected(!isSelected);
    setShoppingList([...shoppingList, ...recipes]);
  };
  console.log(isSelected, '<-isSelected');

  return (
    <div
      className="day-month border d-flex flex-column col-12 position-relative"
      // key={`day-${dayIndex}`}
    >
      {isSelected ? (
        <div
          className="addedToCart position-absolute w-100 h-100"
          style={{ backgroundColor: 'rgba(0,0,0,.2)' }}
          z-index="1"
        ></div>
      ) : (
        ''
      )}
      <div
        ref={drop}
        style={{ backgroundColor }}
        className={`${dateType} col-12 d-flex flex-column h-100`}
      >
        <div className="row mb-auto">
          <div className="col-5">
            {isSelected ? (
              <CartDashFill
                onClick={handleClick}
                className="ms-1 text-danger cart-icon"
              />
            ) : (
              <CartPlusFill
                onClick={handleClick}
                className="ms-1 text-primary cart-icon"
              />
            )}
          </div>
          <div className="col-5 offset-1 text-end">{dayNumber}</div>
        </div>
        <div className="mt-auto col-12 w-100">
          {recipes.map((recipe, i) => {
            return (
              <div
                key={recipe._id + '-' + i}
                className="text-center text-white"
              >
                <div
                  style={{
                    fontSize: '.8rem',
                    lineHeight: '.9rem',
                    backgroundColor: dayRecipeColors[recipe._id]
                  }}
                  className="truncated m-1 p-1"
                >
                  {/* {recipe.title.length >= 13
                ? recipe.title.substring(0, 9) + '...'
                : recipe.title} */}
                  <span className="">{recipe.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
