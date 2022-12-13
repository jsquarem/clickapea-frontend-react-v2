import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ShoppingListRecipes from '../../components/ShoppingListRecipes/ShoppingListRecipes';
import ShoppingListCart from '../../components/ShoppingListCart/ShoppingListCart';
import * as recipeBookAPI from '../../utils/recipeBookAPI';
import Container from 'react-bootstrap/Container';

export default function ShoppingListPage({ user }) {
  const [recipes, setRecipes] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();
  console.log(user, '<-user in list');

  console.log(location, '<-location');

  const fetchRecipes = async () => {
    try {
      const response = await recipeBookAPI.getBooks();
      if (location.state) {
        const recipeIDs = location.state.shoppingList.map(
          (recipe) => recipe._id
        );
        console.log(recipeIDs, '<-recipeIDs');
        setCartItems(recipeIDs);
      }

      setRecipes(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleClick = (e) => {
    let newCart = [];
    const recipeID = e.target.id;
    if (cartItems.includes(recipeID)) {
      setCartItems(cartItems.filter((i) => i !== recipeID));
    } else {
      setCartItems([...cartItems, recipeID]);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRecipes();
    }
    if (location.state) {
      const recipeIDs = location.state.shoppingList.map((recipe) => recipe._id);
      console.log(recipeIDs, '<-recipeIDs');
      setCartItems(recipeIDs);
    }
  }, []);

  console.log(cartItems, '<-cartItems');

  return recipes.length > 0 ? (
    <Container style={{ minHeight: '74vh' }}>
      <div className="row pb-5 pt-5">
        <h1 className="text-center mt-5">Shopping Cart</h1>
        <hr />
        <div className="col-12 col-md-4 pb-5 mb-5">
          <h2 className="mb-1">Recipes</h2>
          <ShoppingListRecipes
            shoppingList={cartItems}
            recipes={recipes}
            onClick={handleClick}
          />
        </div>
        <div className="col-12 col-md-6 offset-md-2">
          <h2 className="mb-1">Cart Items</h2>
          {cartItems.length > 0 ? (
            <ShoppingListCart shoppingList={cartItems} />
          ) : (
            <p>
              Click on a recipe to the right to add ingredients to the cart.
            </p>
          )}
        </div>
      </div>
    </Container>
  ) : (
    <Container style={{ minHeight: '74vh' }}>
      <div className="row pb-5 pt-5">
        <h1 className="text-center mt-5">Shopping Cart</h1>
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
        <div className="col-12 col-md-6 offset-md-2 mt-3">
          {cartItems.length > 0 ? (
            <ShoppingListCart shoppingList={cartItems} />
          ) : (
            <>
              <h2 className="mb-1">Make sure save a recipe to get started</h2>
              <p>
                In order to build a shopping list you must first be signed in
                and then you can add a recipe to a recipe book.
              </p>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
