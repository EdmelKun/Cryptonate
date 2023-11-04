import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
import { ethers } from "ethers";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useStateContext } from "../context";
import { checkIfImage } from "../utils";

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
  const navigate = useNavigate();
  const state = useStateContext();
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
                  await createCampaign({
                    ...values,
                    target: ethers.utils.parseUnits(values.target, 18),
                  });
                  navigate("/");
                } else {
                  alert("Provide valid image url");
                }
              });
              resetForm();
            } catch (error) {
              console.error("Failed to create campaign:", error);
            }
          } else {
            console.error("createCampaign function is undefined");
          }
        } else {
          console.log("State is null");
        }
        onClose();
      },
    });

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle className="bg-[#1c1c24] text-white">
        Create Campaign
      </DialogTitle>
      <DialogContent className="bg-[#1c1c24]">
        <TextField
          className="bg-white"
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          required
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          className="bg-white"
          autoFocus
          margin="dense"
          id="title"
          label="Title of Campaign"
          type="text"
          fullWidth
          required
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          className="bg-white"
          autoFocus
          margin="dense"
          id="description"
          label="Description of Campaign"
          type="text"
          fullWidth
          rows={4}
          multiline
          required
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          className="bg-white"
          autoFocus
          margin="dense"
          id="target"
          label="Target of Campaign"
          type="text"
          fullWidth
          required
          value={values.target}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          className="bg-white"
          autoFocus
          margin="dense"
          id="deadline"
          label="Deadline of Campaign"
          type="date"
          fullWidth
          required
          value={values.deadline}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          className="bg-white"
          autoFocus
          margin="dense"
          id="image"
          label="Insert Image URL of Campaign"
          type="url"
          fullWidth
          value={values.image}
          onChange={handleChange}
          onBlur={handleBlur}
        />
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
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
