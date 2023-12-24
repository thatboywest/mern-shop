// Nav.js
import React from "react";
import { FaAccusoft } from "react-icons/fa";

import { HiLogin } from "react-icons/hi";
import { FaCartShopping } from "react-icons/fa6";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./nav.css";

function Nav() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <>
      <nav>
        <div className="left">
          <Link to="/">
            <h1>JEM'S SHOP </h1>
          </Link>
        </div>
        <div className="right">
          <ul>
            <li>
              <Link to="/cart">
                <FaCartShopping />
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <HiLogin onClick={logout} />
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">
                  <p>login</p>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Nav;
