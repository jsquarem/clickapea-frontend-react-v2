import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import * as recipeAPI from '../../utils/recipeAPI';
import RecipeSearchForm from '../../components/RecipeSearchForm/RecipeSearchFrom';
import Recipe from '../../components/Recipe/Recipe';
import EditRecipe from '../../components/EditRecipe/EditRecipe';
import RecipeLoading from '../../components/RecipeLoading/RecipeLoading';
import NewRecipeCarousel from '../../components/NewRecipeCarousel/NewRecipeCarousel';
import Container from 'react-bootstrap/Container';
import './RecipePage.css';

export default function RecipePage({
  user,
  updateGoogleSchema,
  handleUserUpdate
}) {
  const [error, setError] = useState({
    message: ''
  });
  const [recipeQuery, setRecipeQuery] = useState({ query: '', user });
  const [recipeObject, setRecipeObject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const location = useLocation();
  const { recipeID } = useParams();

  useEffect(() => {
    if (location.state && location.state.query) {
      setRecipeQuery({ ...recipeQuery, query: location.state.query });
      setLoading(true);
    }
  }, [location]);

  useEffect(() => {
    if (recipeID) {
      setRecipeQuery({ ...recipeQuery, query: recipeID });
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      setLoading(true);
    }
  }, [recipeID]);

  useEffect(() => {
    if (loading) {
      const updateRecipeObjectState = async (recipeQuery) => {
        const recipeResponse = await getRecipe(recipeQuery);
        updateGoogleSchema(recipeResponse.googleSchema);
        setRecipeObject({
          recipe: recipeResponse.recipe,
          profile: recipeResponse.profileDocument,
          recipeBooks: recipeResponse.recipeBookDocuments
        });
        setLoading(false);
        if (!recipeID) {
          window.location.href = `/recipes/${recipeResponse.recipe._id}`;
        }
      };
      updateRecipeObjectState(recipeQuery);
    }
  }, [loading]);

  const getRecipe = async (url) => {
    if (url.query.startsWith('http')) {
      const responseRecipe = await recipeAPI.addRecipe(url);
      setRecipeQuery({ ...recipeQuery, query: '' });
      return responseRecipe;
    } else {
      // FIXME: better error reporting, find where the 500 response is coming from check front end console
      // https://www.delish.com/cooking/recipe-ideas/recipes/a50173/chocolate-pumpkin-cheesecake-recipe/
      const responseRecipe = await recipeAPI.findRecipe(url);
      setRecipeQuery({ ...recipeQuery, query: '' });
      if ('error' in responseRecipe) {
        setError({
          message: 'Could not find that recipe, please try again',
          passwordError: true
        });
        setLoading(false);
      }

      return responseRecipe;
    }
  };

  const handleEditing = () => {
    setEditing(!editing);
  };

  return (
    <Container className="pt-5 pb-5" data-testid="recipe-import-container">
      <div className="row pt-5">
        <div className="col-12 col-md-8 offset-md-2 my-5">
          <RecipeSearchForm user={user} />
          <p>
            While Clickapea supports recipe importing from 100s of sites, recipe
            formats are wildly inconsistent and the import may fail. If
            importing fails, try again with a new recipe, or try Clickapea with
            one of the recently added recipes below.
          </p>
        </div>
      </div>
      {loading ? <RecipeLoading /> : ''}
      {error.message ? (
        <h1 className="text-center mt-5">
          <ErrorMessage error={error.message} />
        </h1>
      ) : null}
      {recipeObject && !loading && !error.message && !editing ? (
        <Recipe
          recipeObject={recipeObject}
          user={user}
          handleUserUpdate={handleUserUpdate}
          handleEditing={handleEditing}
        />
      ) : editing ? (
        <EditRecipe
          recipeObject={recipeObject}
          user={user}
          handleEditing={handleEditing}
        />
      ) : (
        <NewRecipeCarousel />
      )}
      {error.message ? (
        <h1 className="text-center mt-5">
          <ErrorMessage error={error.message} />
        </h1>
      ) : null}
    </Container>
  );
}
