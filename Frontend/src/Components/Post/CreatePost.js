import React, { useState, useContext } from "react";

import "./Styles/Createpost.css";

const CreatePost = () => {
  return (
    <section className="post-wrapper">
      <h1>Add New Post</h1>
      <form>
        <input className="post-input" type="text" placeholder="Title" />
        <input className="post-input" type="text" placeholder="Content" />
        <button type="submit">Save new post</button>
      </form>
    </section>
  );
};

export default CreatePost;
