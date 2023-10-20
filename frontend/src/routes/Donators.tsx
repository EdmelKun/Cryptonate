import React from "react";
import { Container, Typography } from "@mui/material";
import { Navbar } from "../components/Navbar";

export const Donators = () => {
  return (
    <>
      <Container
        sx={{
          marginTop: "5%",
        }}
      >
        <Typography variant="h3">Donators</Typography>
      </Container>
    </>
  );
};
