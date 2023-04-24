import React from "react";

import "./Styles/CreateComment.css";

const CreateComment = () => {
  return (
    <section className="comments-wrapper">
      <section className="comments-wrapper">
        <h1>Add New Comment</h1>
        <form>
          <input
            className="comment-input"
            type="text"
            placeholder="enter your comment"
          />
          <button type="submit">Save new Comment</button>
        </form>
      </section>
    </section>
  );
};

export default CreateComment;
