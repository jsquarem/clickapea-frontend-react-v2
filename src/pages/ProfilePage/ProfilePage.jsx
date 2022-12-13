import React, { useEffect, useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage/SuccessMessage';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import userService from '../../utils/userService';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

export default function ProfilePage({ user, handleUserUpdate }) {
  console.log(user, '<-user');
  const [error, setError] = useState({
    message: '',
    passwordError: false
  });
  const [success, setSuccess] = useState({
    message: ''
  });
  const [checked, setChecked] = useState(true);
  const [state, setState] = useState({
    firstName: user.profile.firstName,
    lastName: user.profile.lastName,
    password: '',
    passwordConfirm: '',
    newsletter: checked,
    profileID: user.profile._id
  });

  // useEffect(() => {
  //   setState({
  //     firstName: user.profile.firstName,
  //     lastName: user.profile.lastName,
  //     password: '',
  //     passwordConfirm: '',
  //     newsletter: checked,
  //     profileID: user.profile._id
  //   });
  // }, []);

  function isPasswordMatch(passwordOne, passwordConf) {
    return passwordOne === passwordConf;
  }

  function handleChange(e) {
    if (e.target.name === 'newsletter') {
      setState({
        ...state,
        newsletter: !checked
      });
      setChecked(!checked);
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('in submit');
    if (!isPasswordMatch(state.password, state.passwordConfirm))
      return setError({
        message: 'Passwords Must Match!',
        passwordError: true
      });
    setError({ message: '', passwordError: false });

    try {
      console.log('in update1');
      const updatedProfile = await userService.update(state);
      if (
        state.password !== '' &&
        (state.firstName !== user.profile.firstName ||
          state.lastName !== user.profile.lastName)
      ) {
        setSuccess({
          message: 'Your name and password have been updated'
        });
        setState({
          password: '',
          passwordConfirm: ''
        });
      } else if (state.password !== '') {
        console.log('password change');
        setSuccess({
          message: 'Your password has been updated'
        });
        setState({
          password: '',
          passwordConfirm: ''
        });
      } else if (
        state.firstName !== user.profile.firstName ||
        state.lastName !== user.profile.lastName
      ) {
        setSuccess({
          message: 'Your name has been updated'
        });
        console.log('Name updated');
      }
      handleUserUpdate(updatedProfile);
    } catch (err) {
      console.log(err.message);
      setError({ message: err.message, passwordError: false });
    }
  }

  return (
    <Container style={{ minHeight: '74vh' }}>
      <div className="bg-light">
        <div className="col-12 col-md-4 offset-md-4 mb-5 pt-5">
          <h1 className="text-center mt-5">Update Information</h1>
          <Form className="form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="firstName"
                value={state.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={state.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                error={error.passwordError}
                placeholder="Password"
                name="password"
                value={state.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPasswordConfirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                error={error.passwordError}
                placeholder="Confirm Password"
                name="passwordConfirm"
                value={state.passwordConfirm}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                name="newsletter"
                label="Sign up for newsletter"
                checked={checked}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary text-white" type="submit">
                Update
              </Button>
            </div>
          </Form>
          {error.message ? <ErrorMessage error={error.message} /> : null}
          {success.message ? (
            <SuccessMessage success={success.message} />
          ) : null}
        </div>
        <div className="col-12 mb-5 mt-5">
          <div className="col-10 offset-1">
            <hr />
          </div>
          <h1 className="text-center mt-5">My Recipes</h1>
        </div>
      </div>
    </Container>
  );
}
