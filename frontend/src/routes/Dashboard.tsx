import React from "react";
import { Container, Typography, Box } from "@mui/material";
import DonationTable from "../components/DonationTable";
import { Navbar } from "../components/Navbar";

export const Dashboard = () => {
  return (
    <>
      <Container className="border-2 bg-white">
        <Typography variant="h3">Dashboard</Typography>
        <div className="mt-10">
          <DonationTable />
        </div>
      </Container>
    </>
  );
};
