import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import './Custom.scss';
import RecipePage from '../RecipePage/RecipePage';
import SavedRecipesPage from '../SavedRecipesPage/SavedRecipesPage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import HomePage from '../HomePage/HomePage';
import RecipeCategoryPage from '../RecipeCategoryPage/RecipeCategoryPage';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import userService from '../../utils/userService';
import PlannerPage from '../PlannerPage/PlannerPage';
import AboutPage from '../AboutPage/AboutPage';
import ShoppingListPage from '../ShoppingListPage/ShoppingListPage';
import RecipeLoading from '../../components/RecipeLoading/RecipeLoading';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProfilePage from '../ProfilePage/ProfilePage';
import { Helmet } from 'react-helmet';
import { MdSupervisedUserCircle } from 'react-icons/md';

export default function App() {
  const [user, setUser] = useState(userService.getUser());
  const [googleSchema, setGoogleSchema] = useState({});
  console.log(user, '<-user in app');

  const handleSignUpOrLogin = () => {
    setUser(userService.getUser());
  };

  const handleUserUpdate = (updatedProfile) => {
    setUser({
      ...user,
      profile: updatedProfile
    });
  };

  const updateGoogleSchema = (googleSchema) => {
    setGoogleSchema(googleSchema);
    // console.log(googleSchema, '<-googleSchema');
  };

  const handleLogout = () => {
    userService.logout();
    setUser(null);
  };

  return (
    <>
      <Helmet>
        <script className="structured-data-list" type="application/ld+json">
          {JSON.stringify(googleSchema)}
        </script>
      </Helmet>
      <Router>
        <Nav user={user} handleLogout={handleLogout} />
        <Routes>
          <Route exact path="/" element={<HomePage user={user} />} />
          <Route path="/planner" element={<PlannerPage user={user} />} />
          <Route path="/list" element={<ShoppingListPage user={user} />} />
          <Route path="/loading" element={<RecipeLoading user={user} />} />
          <Route
            path="/recipes/"
            element={
              <RecipePage user={user} updateGoogleSchema={updateGoogleSchema} />
            }
          />
          <Route
            path="/recipes/dinner"
            element={<RecipeCategoryPage user={user} category="dinner" />}
          />
          <Route
            path="/recipes/lunch"
            element={<RecipeCategoryPage user={user} category="lunch" />}
          />
          <Route
            path="/recipes/breakfast"
            element={<RecipeCategoryPage user={user} category="breakfast" />}
          />
          <Route
            path="/recipes/soup"
            element={<RecipeCategoryPage user={user} category="soup" />}
          />
          <Route
            path="/recipes/salad"
            element={<RecipeCategoryPage user={user} category="salad" />}
          />
          <Route
            path="/recipes/dessert"
            element={<RecipeCategoryPage user={user} category="dessert" />}
          />
          <Route
            path="/recipes/appetizer"
            element={<RecipeCategoryPage user={user} category="appetizer" />}
          />
          <Route
            path="/recipes/saved"
            element={<SavedRecipesPage user={user} />}
          />
          <Route
            path="/recipes/:recipeID"
            element={
              <RecipePage
                user={user}
                updateGoogleSchema={updateGoogleSchema}
                handleUserUpdate={handleUserUpdate}
              />
            }
          />
          <Route path="/about" element={<AboutPage user={user} />} />
          <Route
            path="/login"
            element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
          />
          <Route
            path="/signup"
            element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
          />
          <Route
            path="/profile"
            element={
              <ProfilePage user={user} handleUserUpdate={handleUserUpdate} />
            }
          />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        <Footer user={user} />
      </Router>
    </>
  );
}
