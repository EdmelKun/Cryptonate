import React from "react";
import { Container, Typography } from "@mui/material";
import { Navbar } from "../components/Navbar";

export const Campaigns = () => {
  return (
    <>
      <Container
        sx={{
          marginTop: "5%",
        }}
      >
        <Typography variant="h3">Campaigns</Typography>
      </Container>
    </>
  );
};
