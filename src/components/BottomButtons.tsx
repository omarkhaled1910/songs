import { Box, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const BottomButtons = ({
  onCancel,
  onNext,
  cancelText = "Cancel",
  saveText = "Save",
}: {
  onCancel?: () => void;
  onNext?: () => void;
  cancelText: string;
  saveText: string;
}) => {
  return (
    <Box
      sx={{
        height: "50px",
        marginTop: "70px",
        display: "flex",
        justifyContent: "space-between",
        paddingTop: "2px",
        position: "relative",
        paddingX: 6,
      }}
    >
      <Button
        onClick={onCancel}
        sx={{ paddingInline: "20px" }}
        variant="outlined"
      >
        {cancelText}
      </Button>
      <Button
        variant="outlined"
        sx={{
          paddingInline: "30px",
          backgroundColor: "#1677ff",
          color: "white",
          ":hover": {
            backgroundColor: "#0958c7 !important",
          },
        }}
        onClick={onNext}
      >
        {saveText}
      </Button>
    </Box>
  );
};

export default BottomButtons;
