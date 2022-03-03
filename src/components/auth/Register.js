import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

import Navbar from '../../components/layout/Navbar';

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { styled } from "@mui/material/styles";

const LoginWrapper = styled(Stack)(({ theme }) => ({
  height: "100vh"
}));

const FormWrapper = styled(Box)(({ theme }) => ({
  width: "30%",
  minWidth: "300px"
}));

const LoginTitle = styled(Typography)(({ theme }) => ({
  marginBottom: "10px",
}));

const LoginSubTitle = styled(Typography)(({ theme }) => ({
  marginBottom: "50px",
}));

const LoginTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  marginBottom: "40px",
  "& input": {
    padding: "10px 0"
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  width: '100%',
  backgroundColor: '#43425d',
  padding: '10px 0'
}));

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <LoginWrapper alignItems="center" justifyContent="space-around">
        <FormWrapper>
          <LoginTitle variant="h4" align="center" color="#717171">
            Sign Up
          </LoginTitle>
          <LoginSubTitle variant="h6" align="center" color="#717171">
            Create Your Account
          </LoginSubTitle>
          <form onSubmit={onSubmit}>
            <LoginTextField
              variant="standard"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
            />

            <LoginTextField
              variant="standard"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChange}
            />

            <LoginTextField
              variant="standard"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              minLength="6"
            />

            <LoginTextField
              variant="standard"
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={onChange}
            />

            <LoginButton variant="contained" type="submit">
              Register
            </LoginButton>

            <Typography variant="p" sx={{marginTop: 20}}>
              Already have an account? <Link to="/login">Sign In</Link>
            </Typography>
          </form>
        </FormWrapper>
      </LoginWrapper>
    </>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
