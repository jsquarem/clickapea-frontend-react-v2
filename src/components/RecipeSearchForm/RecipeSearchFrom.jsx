import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { AsyncTypeahead, Menu, MenuItem } from 'react-bootstrap-typeahead';
import * as recipeAPI from '../../utils/recipeAPI';
import { useNavigate } from 'react-router-dom';
import './RecipeSearchForm.css';

export default function RecipeSearchForm({ user }) {
  const [query, setQuery] = useState({ query: '', profile: null });
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  const handleChange = async (e) => {
    if (e.length > 2) {
      if (e.startsWith('htt')) {
        if (user) {
          setQuery({
            ...query,
            query: e,
            profile: user.profile
          });
        } else {
          setQuery({ ...query, query: e });
        }
      } else {
        setIsLoading(true);
        const recipeResponse = await recipeAPI.searchRecipes(e);
        setIsLoading(false);
        setOptions(recipeResponse);
        setQuery({ ...query, query: e });
      }
    }
  };

  const handleClick = async (result) => {
    navigate(`/recipes/${result.value}`);
  };

  const renderMenu = (results) => {
    console.log(results, '<-result');
    return (
      <Menu id="typeahead-menu">
        {results.map((result, idx) => (
          <MenuItem
            key={result.label}
            onClick={() => handleClick(result)}
            option={result}
            position={idx}
            id={result.id}
          >
            {result.label}
          </MenuItem>
        ))}
      </Menu>
    );
  };

  return (
    <div className="col-12">
      <Form className="form header-form">
        <Form.Group className="mb-3" controlId="recipeImport">
          <div className="input-group input-group-lg">
            <AsyncTypeahead
              inputProps={{
                name: 'query'
              }}
              isLoading={isLoading}
              labelKey={(option) => `${option.label}`}
              onSearch={handleChange}
              options={options}
              placeholder="Import a recipe with a URL or search our database of recipes by name"
              id="recipe-typeahead"
              renderMenu={renderMenu}
              minLength={3}
              clearButton={true}
              className="form-control p-0"
            />
            <div className="input-group-append">
              <LinkContainer to="/recipes" state={query}>
                <Button variant="primary text-white" type="submit">
                  Find
                </Button>
              </LinkContainer>
            </div>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
}
