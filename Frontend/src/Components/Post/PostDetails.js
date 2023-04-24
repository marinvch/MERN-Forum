import React, { useEffect } from "react";
import "./Styles/Viewpost.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { viewCurrentPost } from "../../redux/features/postActions";

import { useSelector, useDispatch } from "react-redux";

const PostDetails = () => {
  const postId = useParams();
  const dispatch = useDispatch();
  console.log(postId);

  useEffect(() => {
    dispatch(viewCurrentPost(postId.id));
  }, [dispatch]);
  return (
    <section className="post-wrapper">
      <section className="current-post">
        <p className="current-post-title">Title: </p>
        <p>Content:</p>
      </section>
      <p>
        <AddCircleOutlineIcon />
      </p>
      <section className="comments-wrapper"></section>
    </section>
  );
};

export default PostDetails;
