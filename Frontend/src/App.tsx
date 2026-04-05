import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Layout from "./Components/Layout/index.jsx";

// Pages
// import Auth from "./pages/authPage";
// import Register from "./Components/Auth/Register";
// import PostDetails from "./Components/Post/PostDetails";
// import User from "./Components/Profile/User";
// import Profile from "./Components/Profile/Profile";

import "./App.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Layout>
          <Routes>
            {/* Auth Routes */}
            {/* <Route path="/auth" element={<Auth />} />
            <Route path="/register" element={<Register />} /> */}

            {/* Post Routes */}
            {/* <Route path="/posts/:id" element={<PostDetails />} /> */}

            {/* User Routes */}
            {/* <Route path="/dashboard" element={<User />} />
            <Route path="/profile" element={<Profile />} /> */}

            {/* Home Route */}
            <Route path="/" element={<div>Welcome to Forum</div>} />
          </Routes>
        </Layout>
      </Container>
    </BrowserRouter>
  );
};

export default App;
