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
import './NewRecipeCarousel.css';

export default function NewRecipeCarousel() {
  const imageCdnUrl = process.env.REACT_APP_IMAGE_CDN_URL;
  const [newRecipeImages, setNewRecipeImages] = useState([]);
  const isMobile = useMediaQuery({ query: `(max-width: 759px)` });
  const isSmall = useMediaQuery({
    query: `(max-width: 1279px)`
  });
  const isMedium = useMediaQuery({ query: `(max-width: 1919px)` });
  const isLarge = useMediaQuery({ query: `(min-width: 2000px)` });

  const fetchNewRecipeImages = useCallback(async () => {
    try {
      const response = await recipeAPI.getNewRecipeImages();
      setNewRecipeImages(response.recipeURLs);
    } catch (err) {
      console.log(err.message);
    }
  }, [newRecipeImages]);

  useEffect(() => {
    fetchNewRecipeImages();
  }, []);

  let imageCount = 4;
  imageCount = isSmall ? 3 : imageCount;
  imageCount = isMobile ? 2 : imageCount;

  return (
    <Container className="col-12">
      <Row>
      <Carousel>
        {newRecipeImages.length > 0 &&
          Array.from(
            { length: Math.ceil(newRecipeImages.length / imageCount) },
            (_, i) => (
              <Carousel.Item className="mb-5" key={`carosel-${i}`}>
                <Stack
                  direction="horizontal"
                  className="h-100 justify-content-center align-items-center"
                  gap={3}
                >
                  {newRecipeImages
                    .slice(i * imageCount, (i + 1) * imageCount)
                    .map((recipe) => (
                      <RecipeCard recipe={recipe} count={i} />
                    ))}
                </Stack>
              </Carousel.Item>
            )
          )}
      </Carousel>
      </Row>
    </Container>
  );
}
