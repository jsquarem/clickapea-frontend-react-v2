import React, { useCallback, useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavRecipeBooks from '../NavRecipeBooks/NavRecipeBooks';
import * as recipeAPI from '../../utils/recipeAPI';
import { LinkContainer } from 'react-router-bootstrap';
import logo from './clickapea-logo-180x180.png';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Nav.css';

export default function NavBar({ user, handleLogout }) {
  return (
    <Navbar
      fluid
      bg="light"
      expand="lg"
      style={{ boxShadow: '0 8px 6px -6px #999' }}
    >
      <Container fluid className="nav-container">
        <Navbar.Brand href="/">
          <img
            width="40"
            height="40"
            className="d-inline-block align-center"
            alt="Clickapea Logo"
            src={logo}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <span className="d-none d-md-block align-self-center h3 pt-2 nav-span">
              /
            </span>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <span className="d-none d-md-block align-self-center h3 pt-2 nav-span">
              /
            </span>
            <NavDropdown title="Recipes" id="basic-nav-dropdown">
              <NavDropdown.Item href="/recipes/dinner">Dinner</NavDropdown.Item>
              <NavDropdown.Item href="/recipes/lunch">Lunch</NavDropdown.Item>
              <NavDropdown.Item href="/recipes/breakfast">
                Breakfast
              </NavDropdown.Item>
              <NavDropdown.Item href="/recipes/soup">Soup</NavDropdown.Item>
              <NavDropdown.Item href="/recipes/salad">Salad</NavDropdown.Item>
              <NavDropdown.Item href="/recipes/dessert">
                Dessert
              </NavDropdown.Item>
              <NavDropdown.Item href="/recipes/appetizer">
                Appetizer
              </NavDropdown.Item>
            </NavDropdown>
            <span className="d-none d-md-block align-self-center h3 pt-2 nav-span">
              /
            </span>
            <LinkContainer to="/planner">
              <Nav.Link>Planner</Nav.Link>
            </LinkContainer>
            <span className="d-none d-md-block align-self-center h3 pt-2 nav-span">
              /
            </span>
            <LinkContainer to="/list">
              <Nav.Link>Shopping List</Nav.Link>
            </LinkContainer>
            {user && (
              <>
                <span className="d-none d-md-block align-self-center h3 pt-2 nav-span">
                  /
                </span>
                <LinkContainer to="/recipes/saved/">
                  <Nav.Link>My Recipes</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
          {user ? (
            <Nav>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title={user.profile.firstName}
                align="end"
                menuVariant="light"
              >
                <LinkContainer to="/profile">
                  <NavDropdown.Item href="/profile">
                    My Profile
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/">
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/signup">
                <Button variant="primary text-white">Signup</Button>
              </LinkContainer>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
