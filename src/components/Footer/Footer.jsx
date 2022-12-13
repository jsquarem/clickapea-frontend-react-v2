import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import RecipeSearchForm from '../../components/RecipeSearchForm/RecipeSearchFrom';
import './Footer.css';
import ReactGA from "react-ga4";

export default function Footer(user) {
  if (process.env.REACT_APP_GTAG) {
    ReactGA.initialize(process.env.REACT_APP_GTAG);
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search
    });
  }

  return (
    <Container fluid style={{ padding: "20px 10px", marginTop: '50px', minHeight: '150px', backgroundColor: `rgba(174, 190, 194, 1)` }} className="100vw footer">
      <Row>
        <Col lg="1"></Col>
        <Col lg="3">
          <Row className="text-left">
            <h2

              style={{
                // fontFamily: `Indie Flower, cursive`,
                fontSize: '3rem',
                textShadow: '2px 2px 5px #abbfc2'
              }}
            >
              Clickapea!
            </h2>
          </Row>
          <Row>
            <ListGroup className="FooterList" style={{ backgroundColor: `rgba(0, 0, 0, 0)` }}>
              <ListGroup.Item action href="/">Home</ListGroup.Item>
              <ListGroup.Item action href="/about">About</ListGroup.Item>
              <ListGroup.Item action href="/recipes">Recipes</ListGroup.Item>
            </ListGroup>
          </Row>
        </Col>
        <Col className="d-flex align-self-center" lg="4">
          <RecipeSearchForm user={user} />
        </Col>
        <Col fluid className="d-flex justify-content-end" lg="4">
          <Row className="d-flex align-items-end text-center">
              <span>
                <hr />
                ©2022&nbsp; Clickapea, Inc. - a&nbsp;
                <a className="text-white" href="https://www.jsquarem.com/">
                  JSquareM.com
                </a>
                &nbsp;joint
              </span>
          </Row>
        </Col>
      </Row>

    </Container>
  );
}
