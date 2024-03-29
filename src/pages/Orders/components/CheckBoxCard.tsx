import { Checkbox, Stack } from "@mui/material";

type TCheckBoxCard = {
  id: number;
  checked: boolean;
  onChange: (id: number) => void;
  renderFirstContent: () => JSX.Element;
  renderSecondContent: () => JSX.Element;
  renderThirdContent?: () => JSX.Element;
};
const CheckBoxCard = ({
  id,
  checked,
  onChange,
  renderFirstContent,
  renderSecondContent,
  renderThirdContent,
}: TCheckBoxCard) => {
  return (
    <Stack
      sx={{
        padding: 2,
        borderRadius: "4px",
        border: "1px solid black ",
      }}
      gap={3}
    >
      <Stack
        alignItems={"center"}
        direction={"row"}
        justifyContent={"space-between"}
      >
        <Stack gap={1} alignItems={"center"} direction={"row"}>
          {renderFirstContent()}
        </Stack>
        <Checkbox checked={checked} onChange={() => onChange(id)} />
      </Stack>

      <Stack gap={1} alignItems={"center"} direction={"row"}>
        {renderSecondContent()}
      </Stack>
      {!!renderThirdContent && (
        <Stack gap={1} alignItems={"center"} direction={"row"}>
          {renderThirdContent()}
        </Stack>
      )}
    </Stack>
  );
};

export default CheckBoxCard;
