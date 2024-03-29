import { useCallback, useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import Steps from "../../components/steps";
import BottomButtons from "../../components/BottomButtons";
import { useNavigate, useParams } from "react-router-dom";
import SelectSingersStep from "./components/SelectSingersStep";
import SelectAlbumsStep from "./components/SelectAlbumsStep";
import SelectSongsStep from "./components/SelectSongsStep";
import UserInfo from "./components/UserInfo";
import OrderDetails from "./components/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, editOrder, getOrderById } from "../../reducers/orders";
import { RootState } from "../../store";
import {
  resetForm,
  setBulkAlbumsIds,
  setBulkSongsIds,
  setBulkSingersIds,
  setPrice,
  setUserInfo,
} from "../../reducers/order";

const componentMap: Record<number, JSX.Element> = {
  1: <SelectSingersStep />,
  2: <SelectAlbumsStep />,
  3: <SelectSongsStep />,
  4: <UserInfo />,
};
const SongsOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedStep, setSelectedStep] = useState<number>(1);
  const { singerIds, albumIds, songsIds, userInfo, price } = useSelector(
    (state: RootState) => state.order
  );
  const { seletedOrder } = useSelector((state: RootState) => state.orders);

  const handleNext = useCallback(() => {
    setSelectedStep((old) => {
      if (old === 4) {
        const newOrder = { singerIds, albumIds, songsIds, userInfo, price };
        dispatch(id ? editOrder({ ...newOrder, id }) : addOrder(newOrder));
        navigate("/");
        return old;
      }
      if (old === 1 && singerIds.length === 0) return old;

      return ++old;
    });
  }, [singerIds, albumIds, songsIds, userInfo, price]);

  const handleCancel = useCallback(() => {
    setSelectedStep((old) => {
      if (old === 1) navigate("/");
      return --old;
    });
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getOrderById(id));
    } else {
      dispatch(resetForm());
    }
  }, []);

  useEffect(() => {
    if (seletedOrder && id) {
      dispatch(setBulkSingersIds(seletedOrder?.singerIds));
      dispatch(setBulkAlbumsIds(seletedOrder?.albumIds));
      dispatch(setBulkSongsIds(seletedOrder?.songsIds));
      dispatch(setUserInfo({ key: "name", val: seletedOrder?.userInfo?.name }));
      dispatch(
        setUserInfo({ key: "email", val: seletedOrder?.userInfo?.email })
      );
      dispatch(
        setUserInfo({ key: "phone", val: seletedOrder?.userInfo?.phone })
      );

      dispatch(setPrice(seletedOrder?.price));
    }
  }, [seletedOrder]);

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
