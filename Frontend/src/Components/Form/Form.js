import React from "react";
import { TextField, Typography, Paper } from "@mui/material/";

export default function Form() {
  const handleSubmit = () => {};
  return (
    <Paper className="paper">
      <Form
        autocomplite="off"
        noValidate
        className="form"
        onSubmit={handleSubmit}
      ></Form>
      <Typography variant="h6">Create Post</Typography>
      <TextField
        name="author"
        variant="outlined"
        label="Author"
        fullwidth="true"
      />
    </Paper>
  );
}
