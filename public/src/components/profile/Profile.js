import React, { useEffect, useState } from "react";
import Avatar from "../avatar/Avatar";
import ProfilePost from "../post/ProfilePost";
import { useNavigate, useParams } from "react-router-dom";
import uploadimg from "../../images/upload.png";
import { useDispatch, useSelector } from "react-redux";
// import { setLoading } from "../../redux/slices/appConfigSlice";
import { axiosClient } from "../../utils/axiosClient";
import { getUserProfile } from "../../redux/slices/postConfigSlice";
import { followFeedData } from "../../redux/slices/feedSlice";
// import { getUserProfile } from "../../redux/slices/postSlice";

function Profile() {
  const navigate = useNavigate();
  const [opacity, setopacity] = useState(1);
  const [caption, setcaption] = useState("");
  const [hidden, sethidden] = useState("none");
  const params = useParams();
  const [isMyProfile, setMyProfile] = useState(false);
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const [postimage, setpostimage] = useState("");
  const userProfile = useSelector((state) => state.userPostReducer.userProfile);
  const feedData = useSelector((state) => state.feedReducer.feedData);
  //  console.log(userProfile?.name);
  const [isFollow, setIsFollow] = useState(false);
  const [showReportMessage, setShowReportMessage] = useState(false);

  

  const postsArray = userProfile?.posts;
  // const handleReport = () => {
  //   // Logic for reporting a post
  //   // Redirect the user to the specified link
  //   window.location.href = "https://www.cricbuzz.com/";
  // };
  const handleReport = () => {
    // Logic for reporting a post
    // Show the report message
    setShowReportMessage(true);

    // You can optionally set a timeout to hide the message after a certain duration
    setTimeout(() => {
      setShowReportMessage(false);
    }, 3000); // Hide the message after 3 seconds (3000 milliseconds)
  };
  
  
  <div className="posts-container">
        {postsArray &&
          postsArray.map((item) => (
            <ProfilePost
              key={item?._id}
              postImg={item?.image?.url}
              likesCount={item?.likesCount}
              onReportClick={handleReport}
              
            />
          ))}
      </div>
      
      
  useEffect(() => {
    dispatch(getUserProfile({ userId: params?.userId }));
    setMyProfile(myProfile?._id === params.userId);
    if (feedData?.followings?.find((item) => item?._id === params.userId)) {
      setIsFollow(true);
    } else {
      setIsFollow(false);
    }
  }, [ params.userId,feedData,myProfile]);
  // console.log('vvvvvvvvvv',userProfile);

  // // setIsFollow();
  // if(userProfile?._id === params?.userId){
  //   setIsFollow(true)
  // }
  // else{
  //   setIsFollow(false)
  // }
 
  function handlefollow() {
    dispatch(
      followFeedData({
        userIdToFollow: userProfile?._id,
      })
    );
  }
  function toggle() {
    sethidden("block");
    setopacity(0.6);
  }
  function handleImgae(e) {
    try {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        if (fileReader?.readyState === fileReader?.DONE) {
          setpostimage(fileReader.result ? fileReader.result : uploadimg);
          // console.log(fileReader.result);
        }
      };
    } catch (e) {
      // console.log(e);
    } finally {
    }
  }
  // console.log(userProfile);
  async function submitpost(e) {
    try {
      // dispatch(setLoading(true));
      const result = await axiosClient.post("/post", {
        postimage,
        caption,
      });
      dispatch(
        getUserProfile({
          userId: result?.result?.post?.owner,
        })
      );
      // console.log(result);
    } catch (e) {
      return Promise.reject(e);
    } finally {
      // dispatch(setLoading(false));
      sethidden("none");
      setopacity(1);
      setcaption("");
      setpostimage("");
      // console.log(caption);
    }
  }

  return (
    <>
       {/* {showReportMessage && (
        <div className="bg-green-500 text-white text-center p-2 fixed top-0 left-0 right-0 z-50">
          Post has been reported successfully!
        </div>
      )} */}

      <div
        style={{
          opacity: `${opacity}`,
        }}
        className="overflow-hidden overflow-y-scroll h-[90vh] relative flex flex-col justify-between font-mullish max-w-[1080px] mx-auto"
      >
        <div class="  w-[100%]  flex flex-row p-8  mt-3 space-y-3 items-center   justify-evenly  ">
          {/* //? profile */}
          <div class="flex flex-row space-x-4 items-center">
            <div
              class=" cursor-pointer"
              // onClick={() => navigate("/profile/12121")}
            >
              <a href={userProfile?.avatar?.url} target="_blank">
                <Avatar
                  width="300px"
                  height="300px"
                  src={userProfile?.avatar?.url}
                />
              </a>
            </div>
          </div>
          <div class="flex flex-col items-center space-y-5">
            <div class="flex flex-col justify-start space-y-2 items-start">

            <h2 class="text-2xl    ">{userProfile?.name}</h2>
            <div class="flex flex-row space-x-3">
              <h2 class="text-xl  opacity-60  ">
                {" "}
                <span class="font-bold opacity-100 text-black">
                  {userProfile?.posts?.length}
                </span>{" "}
                post{" "}
              </h2> 
              <h2 class="text-xl opacity-60  ">
                {" "}
                <span class="font-bold opacity-100 text-black">
                  {userProfile?.followers?.length}
                </span>{" "}
                followers{" "}
              </h2>
              <h2 class="text-xl  opacity-60  ">
                {" "}
                <span class="font-bold opacity-100 text-black">
                  {userProfile?.followings?.length}
                </span>{" "}
                following{" "}
              </h2>
            </div>
            <h3 className="leading-10 opacity-90 font-mullish text-lg "> {userProfile?.bio}</h3>
            
            </div>
            {isMyProfile && (
              <button
                class="bg-blue-500 p-[.4rem] rounded-lg hover:bg-blue-700 px-5 transition-all duration-200"
                onClick={() => {
                  navigate("/updateprofile");
                }}
              >
                Update Profile
              </button>
            )}
            {isMyProfile && (
              <button
                class="bg-blue-700 p-[.4rem] rounded-lg hover:bg-blue-900 px-9 w-[200px] text-white  font-bold text-xl transition-all duration-200"
                onClick={toggle}
              >
                Create post
              </button>
            )}
            {!isMyProfile && (
              <button
                onClick={handlefollow}
                class="bg-blue-700 p-[.4rem] rounded-lg hover:bg-blue-900 text-center  w-[100px] text-white  font-bold text-xl transition-all duration-200"
              >
                {isFollow ? <h3>Unfollow</h3> : <h3>follow</h3>}{" "}
              </button>
            )}
          </div>
        </div>
        {/* //?post */}
        <hr />
        <div class="w-[100%] rounded-3xl grid grid-cols-3  ">
          {postsArray &&
            postsArray?.map((item) => {
              return (
                <ProfilePost
                  key={item?._id}
                  postImg={item?.image?.url}
                  likesCount={item?.likesCount} 
                  onReportClick={handleReport}
                />
              );
            })}
          {/* <ProfilePost />
           */}
        </div>
      </div>

      <div
        style={{
          display: `${hidden}`,
        }}
        class="text-white absolute  top-[10%] right-0  left-0 mx-auto w-auto max-w-[450px] h-auto max-h-[500px] border-green-600 rounded-2xl p-7 border bg-deepBlue "
      >
        <label htmlFor="InputImg" class="cursor-pointer ">
          <img
            src={postimage ? postimage : uploadimg}
            alt=""
            height="350px"
            width="350px"
            class="rounded-lg mx-aut0"
          />
        </label>
        <input
          type="file"
          accept="postimage/*"
          id="InputImg"
          class="hidden"
          onChange={handleImgae}
        />

        <button
          class="bg-blue-400 p-[.4rem]  border  text-center mx-auto mt-5 rounded-lg hover:bg-blue-500 transition-all duration-200"
          onClick={submitpost}
        >
          Submit Post
        </button>
        <div class="text-black inline-block ml-6">
          <input
            type="text"
            class="ml-4 p-3  rounded-xl "
            value={caption}
            placeholder="what's your mind"
            onChange={(e) => setcaption(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

export default Profile;
