import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import userService from '../../utils/userService';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import queryString from 'query-string';

export default function LoginPage({ handleSignUpOrLogin }) {
  const [error, setError] = useState('');
  const [state, setState] = useState({
    email: '',
    password: ''
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { redirectTo } = queryString.parse(location.search);
  console.log(location, '<-location');

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      console.log(redirectTo, '<-redirectTo');
      await userService.login(state);
      handleSignUpOrLogin();
      if (redirectTo) {
        navigate(redirectTo);
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <Container style={{ minHeight: '74vh' }}>
      <div className="col-12 col-md-4 offset-md-4 mb-5 pt-5">
        <h1 className="text-center mt-5">Log In</h1>
        <Card>
          <Card.Body>
            <Form className="form" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={state.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary text-white" type="submit">
                  Log in
                </Button>
              </div>
            </Form>
            {error ? <ErrorMessage error={error} /> : null}
          </Card.Body>
        </Card>
        <div>
          Don't have an account? <Link to="/signup">Sign up here!</Link>
        </div>
      </div>
    </Container>
  );
}
