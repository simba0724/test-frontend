import React, { useState, Fragment } from 'react';
import { Link } from "react-router-dom";

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

const SidebarWrapper = styled(Box)(({ theme }) => ({
  width: '15%',
  minWidth: '260px',
  minHeight: '100vh',
  backgroundColor: '#43425d',
  position: 'relative',
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'block'
  }
}));

const HeaderWrapper = styled(Stack)(({ theme }) => ({
  padding: '0 85px',
  height: '72px',
  backgroundColor: '#0277bd',
  [theme.breakpoints.down('md')]: {
    padding: '0 20px',
  },
  position: 'absolute',
  width: '100%'
}));

const HeaderLinkStyle = styled(Stack)(({ theme, active }) => ({
  padding: '6px 20px',
  cursor: 'pointer'
}));

function Navbar({ auth: { isAuthenticated, user }, logout }) {
  const [show, setShow] = useState(false);

  const authLinks = (
    <Stack direction='row' alignItems='center'>
      <Link to="/dashboard">
        <HeaderLinkStyle>
          <Typography variant='p' color='#FFF' sx={{ lineHeight: 1 }}>
            {user ? user.name : ""}
          </Typography>
        </HeaderLinkStyle>
      </Link>
      <HeaderLinkStyle onClick={logout}>
        <Typography variant='p' color='#FFF' sx={{ lineHeight: 1 }}>
          Logout
        </Typography>
      </HeaderLinkStyle>
    </Stack>
  );

  const guestLinks = (
    <Stack direction='row' alignItems='center'>
      <Link to="/register">
        <HeaderLinkStyle>
          <Typography variant='p' color='#FFF' sx={{ lineHeight: 1 }}>
            Register
          </Typography>
        </HeaderLinkStyle>
      </Link>
      <Link to="/login">
        <HeaderLinkStyle>
          <Typography variant='p' color='#FFF' sx={{ lineHeight: 1 }}>
            Login
          </Typography>
        </HeaderLinkStyle>
      </Link>
    </Stack>
  );

  return (
    <>
      <HeaderWrapper
        direction='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <Typography variant="h3">
          <Link to="/" style={{color: "#FFF"}}>
            CHAT
          </Link>
        </Typography>
        
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      </HeaderWrapper>
    </>
  );
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);