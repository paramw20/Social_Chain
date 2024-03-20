import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getMyInfo = createAsyncThunk(
  "user/getMyInfo",
  async (_, ThunkAPI) => {
    try {
      // ThunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.get("/user/getMyInfo");
      // console.log(response.result);
      // console.log(response.result.curUser._id);
      return response.result;
    } catch (e) {
      return Promise.reject(e);
    }
    // finally{
    //     ThunkAPI.dispatch(setLoading(false))
    // }
  }
);
export const deleteMyAccount = createAsyncThunk(
  "/user/delete",
  async (body) => {
    try {
      await axiosClient.delete("/user/");
      // console.log(response.result);
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

export const updateMyProfile = createAsyncThunk(
  "/user/",
  async (body, ThunkAPI) => {
    try {
      // ThunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.put("/user/", body);
      console.log(response.result);
      return response.result;
    } catch (e) {
      return Promise.reject(e);
    }
    // finally {
    //   ThunkAPI.dispatch(setLoading(false));
    // }
  }
);
const appConfigSlice = createSlice({
  name: "appConfig",
  initialState: {
    isloading: false,
    myProfile: {},
    toastData: {},
  },
  reducers: {
    setLoading: (state, action) => {
      state.isloading = action.payload;
    },
    showToast: (state, action) => {
      state.toastData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyInfo.fulfilled, (state, action) => {
        state.myProfile = action.payload?.curUser;
      })
      .addCase(updateMyProfile.fulfilled, (state, action) => {
        state.myProfile = action.payload?.curUser;
      });
  },
});

export default appConfigSlice.reducer;
export const { setLoading, showToast } = appConfigSlice.actions;
