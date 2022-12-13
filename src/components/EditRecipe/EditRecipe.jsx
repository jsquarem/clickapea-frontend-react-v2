import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import * as recipeAPI from '../../utils/recipeAPI';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import EditIngredientList from '../EditIngredientList/EditIngredientList';
import RecipeExtras from '../RecipeExtras/RecipeExtras';
import EquipmentList from '../EquipmentList/EquipmentList';
import EditRecipeInstructions from '../EditRecipeInstructions/EditRecipeInstructions';
import AddToRecipeBookButton from '../AddToRecipeBookButton/AddToRecipeBookButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeartCirclePlus,
  faHeartCircleCheck
} from '@fortawesome/free-solid-svg-icons';
import './EditRecipe.css';

export default function EditRecipe({ recipeObject, user, handleEditing }) {
  const [recipeState, setRecipeState] = useState(recipeObject);
  const [recipeExtras, setRecipeExtras] = useState({
    preparationMinutes: 0,
    cookingMinutes: 0,
    readyInMinutes: 0,
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    veryHealthy: false,
    taste: {
      sweetness: 0,
      saltiness: 0,
      sourness: 0,
      bitterness: 0,
      savoriness: 0,
      fattiness: 0,
      spiciness: 0
    }
  });
  const [ingredientList, setIngredientList] = useState([]);
  const [editIngredients, setEditIngredients] = useState(false);
  const [recipeName, setRecipeName] = useState('');
  // const currentLocation = useLocation();

  console.log(user, '<-user');
  console.log(recipeObject, '<-recipeObject');
  useEffect(() => {
    if (recipeObject.recipe) {
      const recipeExtrasObject = {
        preparationMinutes: recipeObject.recipe.preparationMinutes,
        cookingMinutes: recipeObject.recipe.cookingMinutes,
        readyInMinutes: recipeObject.recipe.readyInMinutes,
        vegetarian: recipeObject.recipe.vegetarian,
        vegan: recipeObject.recipe.vegan,
        glutenFree: recipeObject.recipe.glutenFree,
        dairyFree: recipeObject.recipe.dairyFree,
        veryHealthy: recipeObject.recipe.veryHealthy,
        taste: recipeObject.recipe.taste
      };
      setRecipeExtras(recipeExtrasObject);
      setIngredientList(recipeObject.recipe.extendedIngredients);
      setRecipeName(recipeObject.recipe.title);
    }
  }, []);

  const handleSubmit = () => {
    return '';
  };
  const handleEditSubmit = () => {
    handleEditing();
  };

  const handleEditIngredientsToggle = () => {
    setEditIngredients(!editIngredients);
  };

  const handleIngredientChange = (e) => {
    const [, index, type] = e.target.name.split('-');
    let value = e.target.value;
    if (type === 'amount') {
      value = Number(value);
    }
    ingredientList[index] = {
      ...ingredientList[index],
      [type]: value
    };
    setIngredientList([...ingredientList]);
  };

  const handleTitleChange = (e) => {
    setRecipeName(e.target.value);
  };

  return (
    <Form className="form" onSubmit={handleSubmit}>
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
              <h1 className="text-center text-white">
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Control
                    type="text"
                    placeholder="Recipe Name"
                    name="recipeTitle"
                    value={recipeName}
                    onChange={handleTitleChange}
                  />
                </Form.Group>
              </h1>
            </div>
            <div className="col-12">
              <div className="col-12 text-end">
                <Button variant="info text-white" onClick={handleEditSubmit}>
                  Save Recipe Edits
                </Button>
              </div>
              <div className="col-12 recipe-ingredients bordered rounded">
                <EditIngredientList
                  ingredientList={ingredientList}
                  editIngredients={editIngredients}
                  handleEditIngredientsToggle={handleEditIngredientsToggle}
                  handleIngredientChange={handleIngredientChange}
                />
                <RecipeExtras recipeExtras={recipeExtras} />
              </div>
            </div>
          </div>
        </div>
        <div className="equipment-list bg-white bordered rounded mt-3 py-3">
          <EquipmentList equipmentList={recipeObject.recipe.equipment} />
        </div>
      </div>
      <div className="row pb-5 mb-5">
        <EditRecipeInstructions
          recipeInstructions={recipeObject.recipe.analyzedInstructions}
        />
      </div>
    </Form>
  );
}
