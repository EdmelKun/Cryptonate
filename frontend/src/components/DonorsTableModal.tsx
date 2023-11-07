import React, { useEffect, useState } from "react";

import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useStateContext } from "../context";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  donors: [];
  isLoading: boolean;
}

const columns: GridColDef[] = [
  { field: "donor", headerName: "Eth Address", width: 400},
  { field: "donation", headerName: "Amount Donated", width: 150 },
];

export const DonorsTableModal = ({
  isOpen,
  onClose,
  donors,
  isLoading,
}: DialogProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      {donors.length > 0 ? (
        <>
          <DialogTitle className="bg-[#1c1c24] text-white">
            Top Donors
          </DialogTitle>
          <DialogContent className="bg-[#1c1c24] ">
            {isLoading ? (
              <CircularProgress
                sx={{ marginLeft: "42%", marginTop: 10 }}
                color="secondary"
              />
            ) : (
              <Box className="bg-white">
                <DataGrid
                  rows={donors}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10,
                      },
                    },
                  }}
                  pageSizeOptions={[10]}
                />
              </Box>
            )}
          </DialogContent>
        </>
      ) : (
        <>
          <DialogTitle className="bg-[#1c1c24] text-white">
            No donors yet
          </DialogTitle>
          <DialogContent className="bg-[#1c1c24] ">
            {isLoading && (
              <CircularProgress
                sx={{ marginLeft: "42%", marginTop: 10 }}
                color="secondary"
              />
            )}
          </DialogContent>
        </>
      )}

      <DialogActions className="bg-[#1c1c24]">
        <Button variant="contained" color="secondary" onClick={onClose}>
          Return to Campaign
        </Button>
      </DialogActions>
    </Dialog>
  );
};
