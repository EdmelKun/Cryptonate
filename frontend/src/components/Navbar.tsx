import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Box,
} from "@mui/material";

import { cryptonate, menu } from "../assets";
import { navlinks } from "../constants";
import { ReusableButton } from "./ReusableButton";
import SearchIcon from "@mui/icons-material/Search";
import { CreateCampaignModal } from "./CreateCampaignModal";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedLink, setSelectedLink] = useState(location.pathname);
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [openCreateCampaign, setOpenCreateCampaign] = useState(false);
  const ethAddress = "0x123";

  return (
    <Container className="md:flex-row  flex flex-col-reverse justify-between mb-9 gap-6">
      <Box className="lg:flex-1  flex  justify-between py-2 pl-4 pr-2 h-14 bg-[#1c1c24]">
        <Box>
          {/* DO NOT REMOVE. THIS BOX IS FOR SEARCH FIELD */}
          {/* <TextField
            id="searchfield"
            label="Search"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          /> */}
        </Box>

        <Box className="sm:hidden flex justify-between items-center relative">
          <Box className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img
              src={menu}
              alt="menu"
              className="w-[34px] h-[34px] object-contain cursor-pointer"
              onClick={() => setToggleDrawer(!toggleDrawer)}
            />

            <Box
              className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 w-12 rounded-xl ${
                !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
              } transition-all duration-700 `}
            >
              <Box className="mb-4">
                {navlinks.map((link) => (
                  <IconButton
                    className="flex p-4"
                    key={link.name}
                    onClick={() => {
                      setSelectedLink(link.link);
                      navigate(link.link);
                    }}
                  >
                    <div
                      className={
                        link.link === selectedLink
                          ? "bg-gray-200 border rounded-md"
                          : ""
                      }
                    >
                      {link.icon}
                    </div>
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="sm:flex hidden flex-row justify-end gap-4">
          <ReusableButton
            buttonLabel={ethAddress ? "Create Campaign" : "Connect Wallet"}
            handleClick={() => {
              if (ethAddress) {
                setOpenCreateCampaign(true);
              } else {
                console.log("Connect to wallet first");
              }
            }}
          />
        </Box>
      </Box>
      <CreateCampaignModal
        isOpen={openCreateCampaign}
        onClose={() => setOpenCreateCampaign(false)}
      />
    </Container>
  );
};
