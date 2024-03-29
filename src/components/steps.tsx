import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { Typography } from "@mui/material";

const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 29,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#1677ff",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#1677ff",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#cfd3d7",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ ownerState }) => ({
  zIndex: 1,
  color: "#ABADB1",
  width: 62,
  height: 62,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  border: "2px solid",
  fontWeight: "500",
  backgroundColor: "#EEEFEF",
  borderColor: "#ABADB1",

  ...(ownerState.active && {
    backgroundColor: "#E8F2FF",
    color: "#1677ff",
    borderColor: "#1677ff",
  }),
  ...(ownerState.completed && {
    backgroundColor: "#1677ff",
    borderColor: "#1677ff",
    color: "#ffffff",
  }),
}));

const ColorlibStepIcon = (props: StepIconProps) => {
  const { active, completed, className } = props;
  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {props.icon}
    </ColorlibStepIconRoot>
  );
};

const CustomStep = ({ tab, steps }: { tab: number; steps: string[] }) => {
  return (
    <Stepper
      alternativeLabel
      sx={{ width: "100%" }}
      activeStep={tab - 1}
      connector={<ColorlibConnector />}
    >
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel StepIconComponent={ColorlibStepIcon}>
            <Typography
              variant="body2"
              fontWeight={500}
              sx={{ color: index + 1 <= tab ? "primary.main" : "grey.main" }}
            >
              {label}
            </Typography>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CustomStep;
