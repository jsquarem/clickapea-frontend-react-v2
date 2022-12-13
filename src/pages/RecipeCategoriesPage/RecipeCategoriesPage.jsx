import React, { useCallback, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import RecipeCarousel from '../../components/RecipeCarousel/RecipeCarousel';
import RecipeSearchForm from '../../components/RecipeSearchForm/RecipeSearchFrom';
import * as recipeAPI from '../../utils/recipeAPI';
import './RecipeCategoriesPage.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function RecipeCategoriesPage({ user, category }) {
  const [recipeCategories, setRecipeCategories] = useState([]);
  const isMobile = useMediaQuery({ query: `(max-width: 759px)` });
  const isSmall = useMediaQuery({
    query: `(max-width: 1279px)`
  });
  const isMedium = useMediaQuery({ query: `(max-width: 1919px)` });
  const isLarge = useMediaQuery({ query: `(min-width: 2000px)` });
  let imageCount = 4;
  imageCount = isSmall ? 3 : imageCount;
  imageCount = isMobile ? 2 : imageCount;

  const fetchCategories = useCallback(async () => {
    try {
      const response = await recipeAPI.getDishTypes();
      setRecipeCategories(response)
    } catch (err) {
      console.log(err.message);
    }
  }, [recipeCategories]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {/*<img
          className="header-image"
          src="https://catcollection7-11.s3.us-east-2.amazonaws.com/pexels-ella-olsson-1600.jpg"
  />*/}
      <Container>
        <Row>
          <header>
            <Row>
              <h1
                className="text-center"
                style={{
                  // fontFamily: `Indie Flower, cursive`,
                  fontSize: '5rem',
                  textShadow: '2px 2px 5px #abbfc2',
                  marginTop: '100px'
                }}
              >
                Clickapea!
              </h1>
            </Row>
          </header>
        </Row>
        {recipeCategories.length > 0 &&
          Array.from(
            { length: Math.ceil(recipeCategories.length / imageCount) },
            (_, i) => (
              <Row>
                {recipeCategories
                  .slice(i * imageCount, (i + 1) * imageCount)
                  .map((dishType) => (
                    <RecipeCarousel dishType={dishType} />
                  ))}
              </Row>
            )
          )}
      </Container>
    </>
  );
}
