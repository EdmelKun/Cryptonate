import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import React from "react";

import { daysLeft } from "../utils";

interface CardProps {
  owner: string;
  title: string;
  description: string;
  image: string;
  target: string;
  deadline: string;
  collectedAmount: string;
  handleDonate: () => void;
  handleViewDonors: () => void;
}

export const CampaignCard = ({
  owner,
  title,
  description,
  image,
  target,
  deadline,
  collectedAmount,
  handleDonate,
  handleViewDonors,
}: CardProps) => {
  const formatRemainingDays = daysLeft(new Date(deadline));

  return (
    <>
      <Card
        sx={{ maxWidth: 345 }}
        className="sm:w-[288px] w-full rounded-[15px] cursor-pointer border-2 border-violet-600"
      >
        <CardMedia
          sx={{ height: 158 }}
          image={image}
          title="campaign"
          component="img"
        />
        <CardContent>
          <Box className="block">
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Box>
          <Box className="flex justify-between flex-wrap mt-4 gap-2">
            <Box className="flex flex-col">
              <Typography variant="body2">
                Amount Raised: {collectedAmount} eth
              </Typography>

              <Typography variant="body2" marginTop={"15px"}>
                Target: {target} eth
              </Typography>

              <Typography variant="body2" marginTop={"15px"}>
                Deadline: {formatRemainingDays} days left
              </Typography>
            </Box>
          </Box>
          <Box className="flex items-center mt-5 gap-3">
            <Typography variant="body2" className="truncate">
              Owner Address: {owner}
            </Typography>
          </Box>
        </CardContent>
        <CardActions className="justify-center">
          <Button size="small" variant="contained" onClick={handleViewDonors}>
            View Donors
          </Button>
          <Button size="small" variant="contained" onClick={handleDonate}>
            Donate to Campaign
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
