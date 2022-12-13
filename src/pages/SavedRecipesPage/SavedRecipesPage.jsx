import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Recipe from '../../components/Recipe/Recipe';
import SavedRecipesList from '../../components/SavedRecipesList/SavedRecipesList';
import * as recipeAPI from '../../utils/recipeAPI';
import * as recipeBookAPI from '../../utils/recipeBookAPI';
import Container from 'react-bootstrap/Container';

export default function SavedRecipesPage({ user }) {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState('');
  const [recipeObject, setRecipeObject] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      const updateRecipeObjectState = async (selectedRecipe) => {
        console.log(selectedRecipe, '<-selectedRecipe');
        const recipeResponse = await recipeAPI.findRecipe(selectedRecipe);
        console.log(recipeResponse, '<-recipeResponse');
        setRecipeObject({
          recipe: recipeResponse.recipe,
          profile: user.profile,
          recipeBooks: recipes
        });
        setLoading(false);
      };
      updateRecipeObjectState({ query: selectedRecipe });
    }
  }, [loading]);

  const fetchRecipes = async () => {
    try {
      const response = await recipeBookAPI.getBooks();
      setRecipes(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleClick = (e) => {
    const recipeID = e.target.id;
    setSelectedRecipe(e.target.id);
    setLoading(true);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return recipes.length > 0 ? (
    <Container style={{ minHeight: "74vh" }} className="pb-5">
      <div className="row pt-5">
        <h1 className="text-center mt-5">Saved Recipes</h1>
        <hr />
        <div className="col-12 col-md-4 mb-5 pb-5">
          <h2 className="mb-1">Recipes</h2>
          <SavedRecipesList
            recipes={recipes}
            onClick={handleClick}
            activeRecipe={selectedRecipe}
          />
        </div>
        <div className="col-12 col-md-8">
          <h2 className="mb-1">Recipe Preview</h2>
          {selectedRecipe.length > 0 ? (
            <Recipe recipeObject={recipeObject} user={user} />
          ) : (
            <p>Click on a recipe at the right to display a preview.</p>
          )}
        </div>
      </div>
    </Container>
  ) : (
    <Container style={{ minHeight: "74vh" }} className="pb-5">
      <div className="row pt-5">
        <h1 className="text-center mt-5">Saved Recipes</h1>
        <hr />
        <div className="col-12 col-md-4 mt-3">
          <h2 className="mb-1">You have no Recipe Books</h2>
          <p>
            Try adding a recipe to a recipe book by clicking the button shown
            below on the recipe page, after importing or finding a recipe.
          </p>
          <p className="text-center">
            <Link to="/recipes">Go back to the Recipe Page</Link>
          </p>
          <img
            style={{ width: '100%' }}
            src="https://catcollection7-11.s3.us-east-2.amazonaws.com/add-recipe-button.png"
          />
        </div>
      </div>
    </Container>
  );
}
