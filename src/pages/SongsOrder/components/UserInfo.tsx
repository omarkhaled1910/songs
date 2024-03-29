import { Stack, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../../reducers/order";
import { RootState } from "../../../store";

const UserInfo = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.order);
  return (
    <Stack mt={4} gap={4}>
      <TextField
        label="name"
        onChange={(e) =>
          dispatch(setUserInfo({ key: "name", val: e.target.value }))
        }
        value={userInfo.name}
      />
      <TextField
        label="email"
        onChange={(e) =>
          dispatch(setUserInfo({ key: "email", val: e.target.value }))
        }
        value={userInfo.email}
      />
      <TextField
        label="phone"
        onChange={(e) =>
          dispatch(setUserInfo({ key: "phone", val: e.target.value }))
        }
        value={userInfo.phone}
      />
    </Stack>
  );
};

export default UserInfo;
