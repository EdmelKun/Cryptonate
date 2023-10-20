import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { Navbar } from "../components/Navbar";

export const Dashboard = () => {
  return (
    <>
      <Container
        sx={{
          marginTop: "5%",
        }}
      >
        <Typography variant="h3">Dashboard</Typography>
      </Container>
    </>
  );
};
