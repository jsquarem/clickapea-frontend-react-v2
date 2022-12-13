import React, { useCallback, useEffect, useState } from 'react';
import CardBoard from '../../components/CardBoard/CardBoard';
import * as recipeAPI from '../../utils/recipeAPI';
import './RecipeCategoryPage.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function RecipeCategoryPage({ user, category }) {
  const [recipeCategory, setRecipeCategory] = useState([]);

  const fetchCategory = useCallback(async () => {
    try {
      const response = await recipeAPI.getDishTypeByCategory(category);
      console.log(response)
      setRecipeCategory(response)
    } catch (err) {
      console.log(err.message);
    }
  }, [recipeCategory]);

  useEffect(() => {
    fetchCategory();
  }, []);

  if (recipeCategory.length !== 0) {
  return (
    <>
      <Container fluid>
        <Row>
          <header>
            <Row>
              <h1
                className="text-center"
                style={{
                  // fontFamily: `Indie Flower, cursive`,
                  fontSize: '5rem',
                  textShadow: '2px 2px 5px #abbfc2'
                }}
              >
                Clickapea!
              </h1>
        <h2 className="text-center"
          style={{
            // fontFamily: `Indie Flower, cursive`,
            fontSize: '3rem',
            textShadow: '2px 2px 5px #abbfc2'
          }}>{category}</h2>
            </Row>
          </header>
        </Row>
          <CardBoard dishType={recipeCategory} />
        <Row>

        </Row>
      </Container>
    </>
  );
              }
}
