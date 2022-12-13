import { Check } from 'react-bootstrap-icons';

export default function ShoppingListRecipes({
  recipes,
  onClick,
  activeRecipe
}) {
  const recipeBoks = recipes.map((book) => {
    const recipeListItems = book.recipes.map((recipe) => {
      //   console.log(activeRecipe, '<-activeRecipe');
      //   console.log(recipe._id, '<-recipe._id');
      if (activeRecipe === recipe._id) {
        return (
          <li
            key={recipe._id}
            id={recipe._id}
            className="list-group-item list-group-item-action text-success"
            onClick={onClick}
          >
            <Check />
            {recipe.title}
          </li>
        );
      } else {
        return (
          <li
            key={recipe._id}
            id={recipe._id}
            className="list-group-item list-group-item-action"
            onClick={onClick}
          >
            {recipe.title}
          </li>
        );
      }
    });
    return (
      <div key={book._id} className="mt-3">
        <h5>{book.name}</h5>
        <ul className="list-group list-group-flush rounded border">
          {recipeListItems}
        </ul>
      </div>
    );
  });

  return <>{recipeBoks}</>;
}
