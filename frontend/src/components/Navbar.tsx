import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Box,
} from "@mui/material";

import { cryptonate } from "../assets";
import { navlinks } from "../constants";
import { ReusableButton } from "./ReusableButton";
import SearchIcon from "@mui/icons-material/Search";

export const Navbar = () => {
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
        <Box>
          <ReusableButton buttonLabel={"Connect Wallet"} />
        </Box>
      </Box>
    </Container>
  );
};
