import React, { useEffect, useState } from "react";
import { Container, AppBar, Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();
  const navigate = useNavigate();

  const [isDashboardClicked, setIsDashboardClicked] = useState(false);
  const [isCampaignsClicked, setIsCampaignsClicked] = useState(false);
  const [isDonatorsClicked, setIsDonatorsClicked] = useState(false);

  const handleDashboardClick = () => {
    setIsDashboardClicked(true);
    setIsCampaignsClicked(false);
    setIsDonatorsClicked(false);

    navigate("/");
  };
  const handleCampaignsClick = () => {
    setIsDashboardClicked(false);
    setIsCampaignsClicked(true);
    setIsDonatorsClicked(false);

    navigate("/campaigns");
  };
  const handleDonatorsClick = () => {
    setIsDashboardClicked(false);
    setIsCampaignsClicked(false);
    setIsDonatorsClicked(true);
    navigate("/donators");
  };

  return (
    <AppBar
      sx={{
        backgroundColor: "#712cf9",
        height: "8%",
        width: "100%",
      }}
    >
      <Grid
        container
        width={"80%"}
        sx={{
          height: "100%",
          placeSelf: "center",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Grid item>
          <Button
            onClick={(e) => {
              preventDefault(e);
              handleDashboardClick();
            }}
            variant="text"
            size="small"
          >
            <Typography
              variant={isDashboardClicked ? "h6" : "subtitle1"}
              sx={{
                color: "white",
                fontWeight: isDashboardClicked ? "bold" : "normal",
              }}
            >
              Dashboard
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={(e) => {
              preventDefault(e);
              handleCampaignsClick();
            }}
            variant="text"
            size="small"
          >
            <Typography
              variant={isCampaignsClicked ? "h6" : "subtitle1"}
              sx={{
                color: "white",
                fontWeight: isCampaignsClicked ? "bold" : "normal",
              }}
            >
              Campaigns
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={(e) => {
              preventDefault(e);
              handleDonatorsClick();
            }}
            variant="text"
            size="small"
          >
            <Typography
              variant={isDonatorsClicked ? "h6" : "subtitle1"}
              sx={{
                color: "white",
                fontWeight: isDonatorsClicked ? "bold" : "normal",
              }}
            >
              Donators
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </AppBar>
  );
};
