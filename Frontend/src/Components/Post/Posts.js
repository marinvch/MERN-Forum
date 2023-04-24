import React, { useEffect } from "react";
import "./Styles/Post.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../redux/features/postActions";
import moment from "moment";
import Loader from "../Spinner/Spinner";
import {
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box,
} from "@mui/material/";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Post = () => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleViewPost = (postId) => {
    history.push(`posts/${postId}`);
  };

  return (
    <Container>
      {posts === null ? (
        <Loader />
      ) : (
        posts.posts?.map((post, id) => {
          const { _id } = post;
          console.log(post);
          return (
            <List
              key={_id}
              sx={{
                width: "100%",
                maxWidth: 1200,
                justifyContent: "space-between",
              }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    {post?.author?.username.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box
                      onClick={() => handleViewPost(_id)}
                      style={{ cursor: "pointer" }}
                    >
                      <Typography
                        sx={{ fontWeight: "light" }}
                        fontSize={26}
                        component="div"
                        variant="body2"
                        color="#b2fab4"
                      >
                        {post.title}
                      </Typography>
                      <Typography
                        lineHeight={1}
                        fontSize={12}
                        component="div"
                        variant="body2"
                        color="#212121"
                      >
                        {post.content}
                      </Typography>
                    </Box>
                  }
                />
                <Divider />
                <Grid>
                  <ListItemText>
                    <Typography variant="subtitle2">
                      likes: {post.likes}
                    </Typography>
                    <Typography variant="subtitle2">
                      posted: {moment(post.createdAt).fromNow()}
                    </Typography>
                  </ListItemText>
                </Grid>
              </ListItem>
            </List>
          );
        })
      )}
    </Container>
  );
};

export default Post;
