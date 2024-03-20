import React, { useEffect } from "react";
import Post from "../post/Post";
import Avatar from "../avatar/Avatar";

import Folllower from "../follower/Folllower";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFeedData } from "../../redux/slices/feedSlice";
function Feed() {
  const navigate = useNavigate();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

  const feedData = useSelector((state) => state.feedReducer.feedData);
  const postsArray = feedData?.posts;

  // console.log("viiiiii",postsArray );
  // console.log(feedData?._id);
  // console.log(userProfile?._id);
  // const userProfile = useSelector((state) => state.userPostReducer.userProfile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeedData());
  }, [dispatch]);
  return (
    <>
      <div class=" overflow-hidden h-[90vh] relative flex justify-between font-mullish max-w-[1080px] mx-auto  ">
        {/* contents */}
        <div class="w-[65%] rounded-3xl overflow-y-scroll ">
          {postsArray &&
            postsArray.map((item) => {
              return (
                <Post
                  key={item?._id}
                  name={item?.owner?.name}
                  postImg={item?.image?.url}
                  img={item?.owner?.avatar?.url}
                  caption={item?.caption}
                  likesCount={item?.likesCount}
                  postId={item?._id}
                  isLiked={item?.isLiked}
                  _id={item?.owner?._id}
                  timeAgo={item?.timeAgo}
                />
              );
            })}
        </div>
        {/* suggestions */}
        <div class="  w-[30%]  flex flex-col mt-3   ">
          {/* //TODO   your profile */}
          <div class="flex flex-row items-center space-x-4 border-b-4 border-indigo-400 pb-4  ">
            <div
              class=" cursor-pointer"
              onClick={() => navigate(`/profile/${myProfile?._id}`)}
            >
              <Avatar width="50px" heigth="50px" src={myProfile?.avatar?.url} />
            </div>
            <h2 class="text-lg   ">{myProfile?.name}</h2>
          </div>

          <div class="mt-3 space-y-2 border-b-4 border-indigo-400 pb-4   ">
            {/* <h1 class="text-2xl  opacity-70">Suggestion for you </h1> */}
            <h1 class="text-lg  opacity-70">you are following </h1>
            {feedData?.followings &&
              feedData?.followings.map((item) => {
                return (
                  <Folllower
                    key={item?._id}
                    img={item?.avatar?.url}
                    name={item?.name}
                    _id={item?._id}
                    follow="Unfollow"
                    // follow="follow"
                  />
                );
              })}
          </div>
          <div class="mt-3 space-y-2   ">
            <h1 class="text-lg  opacity-70">Suggestion for you </h1>
            {feedData?.suggestions &&
              feedData?.suggestions.map((item) => {
                return (
                  <Folllower
                    key={item?._id}
                    img={item?.avatar?.url}
                    _id={item?._id}
                    follow="follow"
                    name={item?.name}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Feed;
