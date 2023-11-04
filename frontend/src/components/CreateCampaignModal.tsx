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
import { useFormik } from "formik";

import * as yup from "yup";

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
      onSubmit: (values) => {
        console.log(values);
        resetForm();
        onClose();
      },
    });

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Create Campaign</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your campaign details
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          required
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title of Campaign"
          type="text"
          fullWidth
          variant="standard"
          required
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description of Campaign"
          type="text"
          fullWidth
          variant="standard"
          rows={4}
          multiline
          required
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          autoFocus
          margin="dense"
          id="target"
          label="Target of Campaign"
          type="text"
          fullWidth
          variant="standard"
          required
          value={values.target}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          autoFocus
          margin="dense"
          id="deadline"
          label="Deadline of Campaign"
          type="text"
          fullWidth
          variant="standard"
          required
          value={values.deadline}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          autoFocus
          margin="dense"
          id="image"
          label="Insert Image of Campaign"
          type="text"
          fullWidth
          variant="standard"
          value={values.image}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </DialogContent>
      <form onSubmit={handleSubmit}>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
