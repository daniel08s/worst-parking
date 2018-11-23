import React from 'react';
import { NavLink } from 'react-router-dom';

import Logout from '../components/Auth/Logout';
import { StyledNavbar, StyledNavUl, StyledNavLi } from './Styles';

const Navbar = ({ session }) => (
  <StyledNavbar>
    {session && session.getCurrentUser ? <NavbarAuth session={session} /> : <NavbarUnAuth />}
  </StyledNavbar>  
);

const NavbarAuth = ({ session }) => (
  <>
    <StyledNavUl>
      <StyledNavLi>
        <NavLink to="/" exact>Home</NavLink>
      </StyledNavLi>
    </StyledNavUl>
    <StyledNavUl>
      <StyledNavLi>
        <NavLink to="/search">Search</NavLink>
      </StyledNavLi>
      <StyledNavLi>
        <NavLink to="/post/add">Post</NavLink>
      </StyledNavLi>
      <StyledNavLi>
        <NavLink to="/profile">Profile</NavLink>
      </StyledNavLi>
      <StyledNavLi>
        <Logout />
      </StyledNavLi>
    </StyledNavUl>
  </>
);

const NavbarUnAuth = () => (
  <>
    <StyledNavUl>
      <StyledNavLi>
        <NavLink to="/" exact>Home</NavLink>
      </StyledNavLi>
    </StyledNavUl>
    <StyledNavUl>
      <StyledNavLi>
        <NavLink to="/search">Search</NavLink>
      </StyledNavLi>
      <StyledNavLi>
        <NavLink to="/login">Login</NavLink>
      </StyledNavLi>
      <StyledNavLi>
        <NavLink to="/register">Register</NavLink>
      </StyledNavLi>
    </StyledNavUl>
  </>
);

export default Navbar;
