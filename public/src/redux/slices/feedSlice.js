import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

import { likesAndUnlike } from "./postConfigSlice";

export const getFeedData = createAsyncThunk("/feed", async (_, ThunkAPI) => {
  try {
    // ThunkAPI.dispatch(setLoading(true));
    const res = await axiosClient.get("/user/getFeedData");
    // console.log("called",res.result);
    return res.result;
  } catch (e) {
    return Promise.reject(e);
  }
  // finally {
  //   ThunkAPI.dispatch(setLoading(false));
  // }
});

export const followFeedData = createAsyncThunk(
  "user/follow",
  async (body, ThunkAPI) => {
    try {
      // ThunkAPI.dispatch(setLoading(true));
      const res = await axiosClient.post("/user/follow", body);
      console.log("called", res.result.user);
      return res.result.user;
    } catch (e) {
      return Promise.reject(e);
    }
    // finally {
    //   ThunkAPI.dispatch(setLoading(false));
    // }
  }
);
const feedDataSlice = createSlice({
  name: "feedSlice",
  initialState: {
    feedData: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedData.fulfilled, (state, action) => {
        state.feedData = action.payload;
        // console.log(action.payload);
      })
      .addCase(likesAndUnlike.fulfilled, (state, action) => {
        const post = action.payload;

        const index = state.feedData.posts.findIndex(
          (item) => item._id === post._id
        );
        if (index != undefined && index != -1) {
          state.feedData.posts[index] = post;
        }
        // console.log( 'vipin',state.userProfile);
        // console.log( "index", index);
      })
      .addCase(followFeedData.fulfilled, (state, action) => {
        const user = action.payload;
        const index = state.feedData?.followings?.findIndex(
          (item) => item._id === user._id
        );
        if (index !== undefined && index !== -1) {
          state.feedData?.followings?.splice(index, 1);
        } else {
          state.feedData?.followings?.push(user);
        }
      });
  },
});

export default feedDataSlice.reducer;
