import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";


export const getUserProfile = createAsyncThunk("/pro", async (body) => {
  try {
    // ThunkAPI.dispatch(setLoading(true));
    const res = await axiosClient.post("/user/getUserProfile", body);
    // console.log("called");
    return res.result;
  } catch (e) {
    return Promise.reject(e);
  }
});
export const likesAndUnlike = createAsyncThunk("post/like", async (body) => {
  try {
    const res = await axiosClient.post("/post/like", body);
    // console.log(res);
    return res.result.post;
  } catch (e) {
    return Promise.reject(e);
  }
});
const userPostSlice = createSlice({
  name: "postSlice",
  initialState: {
    userProfile: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(likesAndUnlike.fulfilled, (state, action) => {
        const post = action.payload;
        // console.log(post)

        const index = state.userProfile?.posts?.findIndex(
          (item) => item._id == post._id
        );
        // console.log(index);
        if (index != undefined && index != -1) {
          state.userProfile.posts[index] = post;
        }
        // console.log( 'vipin',state.userProfile);
        // console.log( "index", index);
      });
  },
});

export default userPostSlice.reducer;
