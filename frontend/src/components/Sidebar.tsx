import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Container, IconButton } from "@mui/material";

import { cryptonate } from "../assets";
import { navlinks } from "../constants";

export const Sidebar = () => {
  const navigate = useNavigate();

  const [isDashboardClicked, setIsDashboardClicked] = useState(false);
  const [isCampaignClicked, setIsCampaignClicked] = useState(false);
  const [isDonorClicked, setIsDonorClicked] = useState(false);

  const handleDashboardClick = () => {
    setIsDashboardClicked(true);
    setIsCampaignClicked(false);
    setIsDonorClicked(false);
  };

  const handleCampaignClick = () => {
    setIsCampaignClicked(true);
    setIsDonorClicked(false);
    setIsDashboardClicked(false);
  };

  const handleDonorClick = () => {
    setIsDonorClicked(true);
    setIsDashboardClicked(false);
    setIsCampaignClicked(false);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        height: "90vh",
      }}
    >
      <Link to="/">
        <IconButton>
          <img
            src={cryptonate}
            className="border border-violet-500 rounded-full p-2 w-[100px] h-[50px]"
          />
        </IconButton>
      </Link>

      <Box
        className=" w-20"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#1c1c24",
          borderRadius: "20px",
          paddingY: 4,
          marginTop: 12,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
          }}
        >
          {navlinks.map((link) => (
            <IconButton
              key={link.name}
              onClick={() => {
                navigate(link.link);
              }}
            >
              <div className={``}>{link.icon}</div>
            </IconButton>
          ))}
        </Box>
      </Box>
    </Container>
  );
};
