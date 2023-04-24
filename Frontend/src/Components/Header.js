import React from "react";

import { Link } from "react-router-dom";
import "./Styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <section className="logo">
        <h1>MERN FORUM</h1>
      </section>
      <section className="navigation">
        <Link className="nav-item" to="/">
          Home
        </Link>
        <Link className="nav-item" to="/add-post">
          Add Post
        </Link>
        <Link className="nav-item" to="/profile">
          Profile
        </Link>
        <Link className="nav-item">Logout</Link>
      </section>
    </header>
  );
};

export default Header;
