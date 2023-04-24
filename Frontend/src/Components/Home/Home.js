import React from "react";
import { Container, Grid } from "@mui/material/";
import Posts from "../Post/Posts";

function Home() {
  return (
    <Container>
      <Grid container justify="space-between" alignItems="center" mt={5}>
        <Posts />
      </Grid>
    </Container>
  );
}

export default Home;
