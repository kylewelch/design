import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import 'components/shared/Header.css'

export default class Header extends Component {
    render() {
      return (
        <header className="header">
          <img src={null} className="App-logo" alt="logo" />
          <h1 className="title">Design App</h1>
          <nav>
            <ul>
              <li>
                <NavLink activeClassName='active' exact to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName='active' to="/login">
                  Login
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
      )
    }
}