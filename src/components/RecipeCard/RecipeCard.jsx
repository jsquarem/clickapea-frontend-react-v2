import { useCallback, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { LinkContainer } from 'react-router-bootstrap';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import DishTypeBadge from '../DishTypeBadge/DishTypeBadge';
import './RecipeCard.css';

export default function RecipeCard({ recipe, count }) {
  const imageCdnUrl = process.env.REACT_APP_IMAGE_CDN_URL;
  const [newRecipeImages, setNewRecipeImages] = useState([]);
  const isMobile = useMediaQuery({ query: `(max-width: 759px)` });
  const isSmall = useMediaQuery({
    query: `(max-width: 1279px)`
  });
  const isMedium = useMediaQuery({ query: `(max-width: 1919px)` });
  const isLarge = useMediaQuery({ query: `(min-width: 2000px)` });

  let imageCount = 4;
  imageCount = isSmall ? 3 : imageCount;
  imageCount = isMobile ? 2 : imageCount;

  return (
    <LinkContainer
      to={`/recipes/${recipe._id}`}
      style={{ cursor: 'pointer', marginBottom: '20px' }}
    >
      <Card className="header-image-card" variant="top" key={recipe._id}>
        <Card.Img
          src={`${imageCdnUrl}/750-${recipe._id}.jpg`}
          alt={recipe.name}
          className="header-carousel-image-card"
        />
        <Card.Body>
          <Card.Title>{recipe.name}</Card.Title>
          <Card.Text>
            <Stack direction="horizontal" gap={4}>
              <h5
                style={{ margin: '-20px 0px 10px' }}
                className="d-flex align-items-start"
              >
                {
                  recipe.dishTypes[
                    Math.floor(Math.random() * recipe.dishTypes.length)
                  ]?.name
                }
              </h5>
              <OverlayTrigger
                key={`cookTime-${count}`}
                placement="top"
                overlay={<Tooltip id={`tooltip-top`}>Total Cook Time</Tooltip>}
              >
                <div style={{ margin: '-20px 0px 10px' }}>
                  <i className="bi bi-clock">&nbsp;</i>
                  {recipe.readyInMinutes}
                </div>
              </OverlayTrigger>
            </Stack>
            <h4 style={{ margin: '-3px 0px -10px' }}>{recipe.title}</h4>
          </Card.Text>
        </Card.Body>
        <Card.Footer style={{ minHeight: '48px' }}>
          <Stack
            className="d-flex align-items-end"
            direction="horizontal"
            gap={2}
          >
            {recipe.vegetarian && (
              <DishTypeBadge dishType="vegetarian" count={count} />
            )}
            {recipe.vegan && <DishTypeBadge dishType="vegan" count={count} />}
            {recipe.glutenFree && (
              <DishTypeBadge dishType="gluten-free" count={count} />
            )}
            {recipe.dairyFree && (
              <DishTypeBadge dishType="dairy-free" count={count} />
            )}
            {recipe.veryHealthy && (
              <DishTypeBadge dishType="very-healthy" count={count} />
            )}
          </Stack>
        </Card.Footer>
      </Card>
    </LinkContainer>
  );
}
