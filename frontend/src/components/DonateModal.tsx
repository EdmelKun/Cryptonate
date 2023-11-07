import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { ethers } from "ethers";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useStateContext } from "../context";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  campaignTitle: string;
  campaignId: number;
}

const donateSchema = yup.object({
  amount: yup
    .string()
    .matches(/^\d+(\.\d+)?$/, "Amount must be a valid number")
    .required("Etherium amount is required"),
});

export const DonateModal = ({
  isOpen,
  onClose,
  campaignTitle,
  campaignId,
}: DialogProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const state = useStateContext();
  const { values, handleBlur, handleChange, handleSubmit, resetForm } =
    useFormik({
      initialValues: {
        amount: "0",
      },
      validationSchema: donateSchema,
      onSubmit: async (values) => {
        if (state) {
          const { donateToCampaign } = state;
          if (donateToCampaign) {
            setIsLoading(true);
            await donateToCampaign({ campaignId, amount: values.amount });
            setIsLoading(false);
          }

          onClose();
        }
      },
    });

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle className="bg-[#1c1c24] text-white">
        Donate to {campaignTitle}
      </DialogTitle>
      <DialogContent className="bg-[#1c1c24]">
        <Typography variant="body2" className=" text-violet-200">
          Etherium Amount
        </Typography>

        {isLoading ? (
          <CircularProgress sx={{ marginLeft: "42%", marginTop: 10 }} color="secondary" />
        ) : (
          <TextField
            disabled={isLoading}
            className="bg-white"
            autoFocus
            margin="dense"
            id="amount"
            name="amount"
            type="text"
            fullWidth
            required
            value={values.amount}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        )}
      </DialogContent>
      <form onSubmit={handleSubmit}>
        <DialogActions
          className="bg-[#1c1c24]"
          sx={{ justifyContent: "center" }}
        >
          <Button
            disabled={isLoading}
            variant="contained"
            color="error"
            onClick={() => {
              onClose();
              resetForm();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            disabled={isLoading}
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
