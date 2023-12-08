import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { ethers } from "ethers";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useStateContext } from "../context";
import { checkDeadline, checkIfImage, checkTargetEth } from "../utils";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const campaignSchema = yup.object({
  name: yup.string().required("Name is required"),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  target: yup.string().required("Target is required"),
  deadline: yup.string().required("Deadline is required"),
  image: yup.string().optional(),
});

export const CreateCampaignModal = ({ isOpen, onClose }: DialogProps) => {
  const state = useStateContext();
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
  const { values, handleBlur, handleChange, handleSubmit, resetForm } =
    useFormik({
      initialValues: {
        name: "",
        title: "",
        description: "",
        target: "",
        deadline: "",
        image: "",
      },
      validationSchema: campaignSchema,
      onSubmit: async (values) => {
        if (state !== null) {
          const { createCampaign } = state;
          if (createCampaign) {
            try {
              checkIfImage(values.image, async (exists: boolean) => {
                if (exists) {
                  if (checkDeadline(new Date(values.deadline)) === false) {
                    if (checkTargetEth(values.target) === false) {
                      setIsCreatingCampaign(true);
                      await createCampaign({
                        ...values,
                        target: ethers.utils.parseUnits(values.target, 18),
                      });
                      setIsCreatingCampaign(false);
                      resetForm();
                      onClose();
                    } else {
                      alert(
                        "Target ETH must be a number and is greater than 0"
                      );
                    }
                  } else {
                    alert("The deadline should be in the future");
                  }
                } else {
                  alert("Please provide valid image url");
                }
              });
            } catch (error) {
              console.error("Failed to create campaign:", error);
            }
          } else {
            console.error("createCampaign function is undefined");
          }
        } else {
          console.error("State is null");
        }
      },
    });

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle className="bg-[#1c1c24] text-white">
        Create Campaign
      </DialogTitle>
      <DialogContent className="bg-[#1c1c24] ">
        <Box className="flex flex-row gap-5">
          <Box className="mb-5">
            <Typography variant="body2" className=" text-violet-200">
              Name
            </Typography>
            <TextField
              className="bg-white"
              autoFocus
              margin="dense"
              id="name"
              name="name"
              type="text"
              fullWidth
              required
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Typography variant="body2" className=" text-violet-200">
              Title of Campaign
            </Typography>
            <TextField
              className="bg-white"
              autoFocus
              margin="dense"
              id="title"
              name="title"
              type="text"
              fullWidth
              required
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Box>

          <Box className="mb-5">
            <Typography variant="body2" className=" text-violet-200">
              Target ETH of Campaign
            </Typography>
            <TextField
              className="bg-white"
              autoFocus
              margin="dense"
              id="target"
              name="target"
              type="text"
              fullWidth
              required
              value={values.target}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Typography variant="body2" className=" text-violet-200">
              Deadline of Campaign
            </Typography>
            <TextField
              className="bg-white"
              autoFocus
              margin="dense"
              id="deadline"
              name="deadline"
              type="date"
              fullWidth
              required
              value={values.deadline}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Box>
        </Box>
        <Box className="mb-5">
          <Typography variant="body2" className=" text-violet-200">
            Description of Campaign
          </Typography>
          <TextField
            className="bg-white"
            autoFocus
            margin="dense"
            id="description"
            name="description"
            type="text"
            fullWidth
            rows={4}
            multiline
            required
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <Typography variant="body2" className=" text-violet-200">
            Insert Image URL of Campaign
          </Typography>
          <TextField
            className="bg-white"
            autoFocus
            margin="dense"
            id="image"
            name="image"
            type="url"
            fullWidth
            value={values.image}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Box>
      </DialogContent>
      <form onSubmit={handleSubmit}>
        <DialogActions className="bg-[#1c1c24]">
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onClose();
              resetForm();
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" color="secondary" type="submit">
            {isCreatingCampaign ? (
              <CircularProgress
                color="inherit"
                size={25}
                sx={{
                  marginX: 5,
                }}
              />
            ) : (
              "Submit"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
