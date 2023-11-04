import { Button } from "@mui/material";

interface ButtonProps {
  buttonLabel: string;
  styles?: string;
  handleClick: () => void;
}

export const ReusableButton = ({
  buttonLabel,
  styles,
  handleClick,
}: ButtonProps) => {
  return (
    <Button
      className={styles}
      variant="contained"
      style={{
        backgroundColor: "#8b5cf6",
      }}
      onClick={handleClick}
    >
      {buttonLabel}
    </Button>
  );
};
