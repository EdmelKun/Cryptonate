import { Button } from "@mui/material";

interface ButtonProps {
  buttonLabel: string;
}

export const ReusableButton = ({ buttonLabel }: ButtonProps) => {
  return (
    <Button
      variant="contained"
      style={{
        backgroundColor: "#8b5cf6",
      }}
    >
      {buttonLabel}
    </Button>
  );
};
