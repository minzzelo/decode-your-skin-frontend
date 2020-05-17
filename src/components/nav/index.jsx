import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

export function Nav() {
  const navStyle = {
    color: "black",
    textDecoration: "none",
  };

  return (
    <>
      <nav>
        <h3>Decode your skin</h3>
        <ul className="nav-links">
          <Link style={navStyle} to="/">
            <li>Home</li>
          </Link>
          <Link style={navStyle} to="/login">
            <li>Login</li>
          </Link>
        </ul>
      </nav>
    </>
  );
}
