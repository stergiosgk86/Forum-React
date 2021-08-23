import React, { useState, useEffect } from "react";
import "./Navigationbar.css";
import { NavLink } from "react-router-dom";
import AuthenticationService from "../security/AuthenticationService";
import logo from "../../Img/devil.png";

function Navigationbar() {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    setIsUserLoggedIn(AuthenticationService.isUserLoggedIn());
  }, [])
  

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark color-nav">
        <div className="container">
          <NavLink exact to="/" className="navbar-brand">
            <img src={logo} alt="logo" style={{width: "80px"}} />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse pl-3"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink
                  exact
                  to="/"
                  activeClassName="active"
                  className="nav-link"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/trips"
                  activeClassName="active"
                  className="nav-link"
                >
                  Trips
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/features"
                  activeClassName="active"
                  className="nav-link"
                >
                  Features
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/news"
                  activeClassName="active"
                  className="nav-link"
                >
                  News
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/about us"
                  activeClassName="active"
                  className="nav-link"
                >
                  About us
                </NavLink>
              </li>
            </ul>
            {isUserLoggedIn ? (
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <NavLink exact to="/profile" className="nav-link">Profile</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/login" onClick={AuthenticationService.logout} className="nav-link">Logout</NavLink>
                                    </li>
                                </ul>
                            ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink exact to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact to="/register" className="nav-link">
                  Register
                </NavLink>
              </li>
            </ul>
             )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigationbar;
