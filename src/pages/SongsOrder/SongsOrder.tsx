import { useCallback, useState } from "react";
import { Box, Stack } from "@mui/material";
import Steps from "../../components/steps";
import BottomButtons from "../../components/BottomButtons";
import { useNavigate, useParams } from "react-router-dom";
import SelectSingersStep from "./components/SelectSingersStep";
import SelectAlbumsStep from "./components/SelectAlbumsStep";
import SelectSongsStep from "./components/SelectSongsStep";
import ReviewOrderStep from "./components/ReviewOrderStep";
import OrderDetails from "./components/OrderDetails";

const componentMap: Record<number, JSX.Element> = {
  1: <SelectSingersStep />,
  2: <SelectAlbumsStep />,
  3: <SelectSongsStep />,
  4: <ReviewOrderStep />,
};
const SongsOrder = () => {
  const id = useParams();
  const navigate = useNavigate();
  const [selectedStep, setSelectedStep] = useState<number>(1);

  const handleNext = useCallback(() => {
    setSelectedStep((old) => {
      if (old === 4) {
        navigate("/");
        return old;
      }
      return ++old;
    });
  }, []);
  const handleCancel = useCallback(() => {
    setSelectedStep((old) => {
      if (old === 1) navigate("/");
      return --old;
    });
  }, []);
  return (
    <Stack p={"20px"}>
      <Steps
        tab={selectedStep}
        steps={["Singers", "Albums", "Songs", "Review"]}
      />
      <Box>
        <Stack gap={3} direction={"row"} height={"68vh"} px={5}>
          <Box
            sx={{
              backgroundColor: "#ffffff",
              width: "75%",
              marginTop: "20px",
              borderRadius: "16px",
              overflowY: "auto",
              p: 4,
            }}
          >
            {componentMap[selectedStep]}
          </Box>
          <Box
            sx={{
              backgroundColor: "#ffffff",
              width: "25%",
              marginTop: "20px",
              borderRadius: "16px",
              overflowY: "auto",
              p: 4,
            }}
          >
            <OrderDetails />
          </Box>
        </Stack>
      </Box>

      <BottomButtons
        onCancel={handleCancel}
        onNext={handleNext}
        cancelText={selectedStep === 1 ? "Cancel" : "Back"}
        saveText={selectedStep === 4 ? (id ? "Save" : "Add") : "Next"}
      />
    </Stack>
  );
};

export default SongsOrder;
