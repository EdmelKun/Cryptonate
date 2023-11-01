import React from "react";
import { Container, Typography, Box } from "@mui/material";
import DonationTable from "./DonationTable";
import { Navbar } from "../components/Navbar";

export const Dashboard = () => {
  return (
    <>
      <Container
        sx={{
          marginTop: "10%",
        }}
      >
        <Typography variant="h3">Dashboard</Typography>
        <div className="mt-10">
          <DonationTable />
        </div>
      </Container>
    </>
  );
};
