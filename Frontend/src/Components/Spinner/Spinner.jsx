import React from "react";

import {
  Container,
  Box,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material/";

export default function Loader() {
  return (
    <Box sx={{ color: "grey.500" }} spacing={2} direction="row">
      <CircularProgress style={{ marginLeft: "50%" }} color="success" />
    </Box>
  );
}
