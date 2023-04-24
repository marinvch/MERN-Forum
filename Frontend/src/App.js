import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "@mui/material/";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./pages/authPage";
import Register from "./components/Auth/Register";
import User from "./components/Profile/User";

import PostDetails from "./components/Post/PostDetails";

import { useSelector } from "react-redux";

import "./App.css";
import Profile from "./components/Profile/Profile";

export default function App() {
  const isUserLogedIn = useSelector((state) => state.auth.token);

  return (
    <BrowserRouter>
      <Container fullwidth="true">
        <Navbar isUsrLogedIn={isUserLogedIn} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth" component={Auth} />
          <Route path="/register" component={Register} />
          {/* Post Routes */}
          <Route path="/posts/:id" component={PostDetails} />

          {/* User Routes */}
          <Route path="/dashbord" component={User} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}
