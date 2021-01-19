import React, { Component } from 'react'
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const NavLogo = styled(Link)`
    color: #fff;
    justify-self: flex-start;
    cursor: pointer;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    margin-left: 15px;
    font-weight: bold;
    text-decoration: none;
    color: black;
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
      text-decoration: none;
    }
`;


export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top mx-auto" >
          <NavLogo to="/">
            Pokemon List
          </NavLogo>
          <NavLogo to="/mypokemon">
            My Pokemon
          </NavLogo>
       </nav>
      </div>
    )
  }
}
