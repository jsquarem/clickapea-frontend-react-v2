import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import * as recipeAPI from '../../utils/recipeAPI';
import Button from 'react-bootstrap/Button';
import IngredientList from '../IngredientList/IngredientList';
import RecipeExtras from '../RecipeExtras/RecipeExtras';
import EquipmentList from '../EquipmentList/EquipmentList';
import RecipeInstructions from '../RecipeInstructions/RecipeInstructions';
import AddToRecipeBookButton from '../AddToRecipeBookButton/AddToRecipeBookButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeartCirclePlus,
  faHeartCircleCheck
} from '@fortawesome/free-solid-svg-icons';
import './Recipe.css';

export default function Recipe({
  recipeObject,
  user,
  handleUserUpdate,
  handleEditing
}) {
  const [recipeExtras, setRecipeExtras] = useState({});
  const [shoppingList, setShoppingList] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
  const [isFavorite, setFavorite] = useState(false);
  const currentLocation = useLocation();
  console.log(ingredientList, '<-ingredientList');
  const navigate = useNavigate();
  console.log(user, '<-user');

  useEffect(() => {
    console.table(recipeObject, '<-recipeObject');
    if (recipeObject.recipe) {
      setRecipeExtras({
        preparationMinutes: recipeObject.recipe.preparationMinutes,
        cookingMinutes: recipeObject.recipe.cookingMinutes,
        readyInMinutes: recipeObject.recipe.readyInMinutes,
        vegetarian: recipeObject.recipe.vegetarian,
        vegan: recipeObject.recipe.vegan,
        glutenFree: recipeObject.recipe.glutenFree,
        dairyFree: recipeObject.recipe.dairyFree,
        veryHealthy: recipeObject.recipe.veryHealthy,
        taste: recipeObject.recipe.taste
      });
      setIngredientList(recipeObject.recipe.extendedIngredients);
      setShoppingList([
        { _id: recipeObject.recipe._id, title: recipeObject.recipe.title }
      ]);
      if (user) {
        setFavorite(checkFavorite(recipeObject.recipe._id));
      }
    }
  }, [recipeObject]);

  const checkFavorite = (recipeID) => {
    const favoriteRecipes = user.profile.recipes.favoriteRecipes;
    if (favoriteRecipes.includes(recipeID)) {
      return true;
    }
    return false;
  };

  const updateFavorite = async (recipeID, profileID) => {
    const updatedProfile = await recipeAPI.updateFavorite(recipeID, profileID);
    console.log(updatedProfile, '<-updatedProfile');
    handleUserUpdate(updatedProfile);
  };

  const handleFavoriteClick = () => {
    if (user) {
      updateFavorite(recipeObject.recipe._id, user.profile._id);
      setFavorite(!isFavorite);
    } else {
      navigate(`/login?redirectTo=${currentLocation.pathname}`);
    }
  };

  return recipeObject.recipe ? (
    <>
      <div className="row recipe-header">
        <div
          className="col-12 p-3 rounded"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0)) , url('${recipeObject.recipe.image}')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        >
          <div className="row">
            <div className="col-12 col-md-6">
              {user && isFavorite ? (
                <FontAwesomeIcon
                  onClick={handleFavoriteClick}
                  icon={faHeartCircleCheck}
                  size="2x"
                  className="text-primary favorite-icon"
                  style={{
                    position: 'relative',
                    top: 0,
                    left: 0,
                    float: 'left'
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  onClick={handleFavoriteClick}
                  icon={faHeartCirclePlus}
                  size="2x"
                  className="text-info favorite-icon"
                  style={{
                    position: 'relative',
                    top: 0,
                    left: 0,
                    float: 'left'
                  }}
                />
              )}
              <h1 className="text-center text-white col-12">
                {recipeObject.recipe.title}
              </h1>
              <AddToRecipeBookButton
                recipeID={recipeObject.recipe._id}
                user={user}
              />
              <div className="row">
                <div className="col-3">
                  <img src="https://catcollection7-11.s3.us-east-2.amazonaws.com/up-arrow.png" />{' '}
                </div>
                <div className="col-7 mt-5 text-center">
                  <span className="text-white h4 pt-5 text-center">
                    Add recipe to a recipebook to build a&nbsp;
                    <Link className="recipe-link" to="/planner">
                      Planner
                    </Link>
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-12 text-center mt-5">
                  <LinkContainer to="/list" state={{ shoppingList }}>
                    <Button variant="primary text-white">
                      Build Shopping List for this Recipe
                    </Button>
                  </LinkContainer>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="row">
                <div className="col-12 text-end mb-3">
                  <Button variant="danger text-white" onClick={handleEditing}>
                    Edit Recipe
                  </Button>
                </div>
              </div>
              <div className="row">
                <div className="col-12 recipe-ingredients bordered rounded">
                  <IngredientList ingredientList={ingredientList} />
                  <RecipeExtras recipeExtras={recipeExtras} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="equipment-list bg-white bordered rounded mt-3 py-3">
          <EquipmentList equipmentList={recipeObject.recipe.equipment} />
        </div> */}
      </div>
      <div className="row pb-5 mb-5">
        <RecipeInstructions
          recipeInstructions={recipeObject.recipe.analyzedInstructions}
        />
      </div>
    </>
  ) : (
    <h1 className="text-center mt-5 pt-5">Unable to import recipe</h1>
  );
}
