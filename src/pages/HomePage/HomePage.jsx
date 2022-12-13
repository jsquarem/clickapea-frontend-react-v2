import NewRecipeCarousel from '../../components/NewRecipeCarousel/NewRecipeCarousel';
import RecipeSearchForm from '../../components/RecipeSearchForm/RecipeSearchFrom';
import './HomePage.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


export default function HomePage({ user }) {
  const imageCdnUrl = process.env.REACT_APP_IMAGE_CDN_URL;
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
                  textShadow: '2px 2px 5px #abbfc2'
                }}
              >
                Clickapea!
              </h1>
            </Row>
            <Row>
              <h3 className="text-center" style={{
                // fontFamily: `Indie Flower, cursive`,
                fontSize: '1rem',
                textShadow: '2px 2px 5px #abbfc2',
                marginLeft: '20px'
              }}>Find - Plan - Shop - Eat - Enjoy
              </h3>
            </Row>
          </header>
        </Row>
        <Row fluid>
          <Col xs={1} md={2}>
          </Col>
          <Col xs={10} md={8}>
            <RecipeSearchForm user={user} />
          </Col>
          <Col xs={1} md={2}>
          </Col>
        </Row>
        <Row>
          <h2
            className="text-center"
            style={{
              // fontFamily: `Indie Flower, cursive`,
              fontSize: '3rem',
              textShadow: '2px 2px 5px #abbfc2'
            }}
          >
            Newly Imported Recipes
          </h2>
        </Row>
        <Row>
          <NewRecipeCarousel />
        </Row>
        <Row>
          <Col>
            <Image rounded src={`${imageCdnUrl}/300-6366ae26224f924066257591.jpg`} />
          </Col>
          <Col lg="8" className="d-flex align-items-stretch">
            <Card >
              <Card.Body>
                <Card.Title><h1>Team Clickapea!</h1></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <h5>Find - Plan - Shop - Eat - Enjoy</h5>
                </Card.Subtitle>
                <Card.Text>
                  Well, hello there friends!  We're very excited to have you
                  here.  We created this space to help consolidate the number of
                  places you need to visit to find something to eat.  You can
                  use an existing recipe from here or insert a link to another
                  sites recipe and begin your recipe collection here!
                </Card.Text>
                <Card.Link href="/about"><Button variant="primary text-white">About Us</Button></Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </>
  );
}
