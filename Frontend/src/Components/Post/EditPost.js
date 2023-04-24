import React from "react";

const EditPost = () => {
  return (
    <section className="post-wrapper">
      <h1>Edit Post</h1>
      <form>
        <input className="post-input" type="text" />
        <input className="post-input" type="text" />
        <button type="submit">Save new post</button>
      </form>
    </section>
  );
};

export default EditPost;
