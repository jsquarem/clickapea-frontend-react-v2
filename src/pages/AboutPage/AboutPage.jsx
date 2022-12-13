import './AboutPage.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';


export default function AboutPage({ user }) {
  const imageCdnUrl = process.env.REACT_APP_IMAGE_CDN_URL;
  return (
    <>
      {/*<img
          className="header-image"
          src="https://catcollection7-11.s3.us-east-2.amazonaws.com/pexels-ella-olsson-1600.jpg"
  />*/}
      <Container style={{ minHeight: "74vh" }}>
        <Row className="d-flex text-center">
          <h1>Who we are</h1>
          <h5>Team Clickapea</h5>
        </Row>
        <Row>
          <Col lg="3">
            <Card className="text-white" style={{ backgroundColor: `rgba(174, 190, 194, 1)` }}>
              <Card.Body>
                <p>“I realized very early the power of food to evoke memory, to
                  bring people together, to transport you to other places, and
                  I wanted to be a part of that.”
                </p>
              </Card.Body>
              <Card.Footer>
                <p className="fw-bold">– José Andrés Puerta</p>
              </Card.Footer>
            </Card>

          </Col>
          <Col style={{ fontSize: "1.3em" }} className="text-large">
            <p>
              We're friends and family that finds the kitchen to hold the homes
              soul.  We dabble, squabble, tinker, and create dishes from around
              the world.  We're home chefs that got a bit overwhelmed with the
              number of cookbooks and sites bookmarked for each of our recipes.
              So we created Clickapea!
            </p>
            <p>
              We set out to create a place where we can consolidate all of our
              online recipes under a single umbrella.  One without all of the
              noise and endless scrolling through paragraphs just to get to the
              recipe.  We've expanded this idea to include the meal planning and
              generating shopping lists for the day, week, and even month.
            </p>
            <p>
              Our goal is to make cooking a little less intimidating by removing
              the stress of trying to remember where your recipes are, making sure
              you've copied all of the ingredients down for your shopping list,
              and helping you plan your meals ahead of time.
            </p>
            <p>- The Clickapea Team</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
