import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

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

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <LoginWrapper alignItems="center" justifyContent="space-around">
        <FormWrapper>
          <LoginTitle variant="h4" align="center" color="#717171">
            Sign In
          </LoginTitle>
          <LoginSubTitle variant="h6" align="center" color="#717171">
            Sign Into Your Account
          </LoginSubTitle>
          <form onSubmit={onSubmit}>
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

            <LoginButton variant="contained" type="submit">
              Login
            </LoginButton>

            <Typography variant="p" sx={{marginTop: 20}}>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </Typography>
          </form>
        </FormWrapper>
      </LoginWrapper>
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
