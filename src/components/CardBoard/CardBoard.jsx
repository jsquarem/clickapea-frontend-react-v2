import { useCallback, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { LinkContainer } from 'react-router-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import RecipeCard from '../RecipeCard/RecipeCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import * as recipeAPI from '../../utils/recipeAPI';
import './CardBoard.css';

export default function CardBoard({ dishType }) {
  const imageCdnUrl = process.env.REACT_APP_IMAGE_CDN_URL;
  const [recipeCarousel, setRecipeCarousel] = useState([]);
  const isMobile = useMediaQuery({ query: `(max-width: 759px)` });
  const isSmall = useMediaQuery({
    query: `(max-width: 1279px)`
  });
  const isMedium = useMediaQuery({ query: `(max-width: 1919px)` });
  const isLarge = useMediaQuery({ query: `(min-width: 2000px)` });

  const fetchRecipeCarousel = useCallback(async () => {
    try {
      console.log(dishType)
      for (let i = 0; i < dishType.length; i++) {
        const response = await recipeAPI.getRecipeCategories(dishType[i]._id);
        setRecipeCarousel(response);
      }
    } catch (err) {
      console.log(err.message);
    }
  }, [recipeCarousel]);

  useEffect(() => {
    fetchRecipeCarousel();
  }, []);

  let imageCount = 5;
  imageCount = isSmall ? 3 : imageCount;
  imageCount = isMobile ? 2 : imageCount;

  return (
    <Container fluid>
      <Row>
        {recipeCarousel.length > 0 &&
          Array.from(
            { length: Math.ceil(recipeCarousel.length / imageCount) },
            (_, i) => (
              <Col>
                <Stack
                  direction="horizontal"
                  className="h-100 justify-content-center align-items-center"
                  gap={3}
                >
                  {recipeCarousel
                    .slice(i * imageCount, (i + 1) * imageCount)
                    .map((recipe) => (
                      <RecipeCard recipe={recipe} count={i} />
                    ))}
                </Stack>
              </Col>
            )
          )}
      </Row>
    </Container>
  )
}
