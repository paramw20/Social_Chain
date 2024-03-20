import React from "react";
import Avatar from "../avatar/Avatar";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { likesAndUnlike } from "../../redux/slices/postConfigSlice";
import { showToast } from "../../redux/slices/appConfigSlice";
import { TOAST_SUCCESS } from "../../App";
function Post(proms) {
  const navigate = useNavigate();


  const dispatch = useDispatch();
  // const likes=useSelector(state=>state.)
  // const likes = useSelector((state) => state.userPostReducer.likes);
  // const likesCount = useSelector((state) => state.userPostReducer.likeCount);
  // const intialLikes=proms?.likesCount?proms.likesCount:0
  // const [like,setLike]=useState(intialLikes)
  // console.log('vipin',likes?.caption);
  // console.log("vipin   v",userProfile);
  function handleLikes() {
    dispatch(
      likesAndUnlike({
        postId: proms?.postId,
      })
    );
    dispatch(showToast({
      type:TOAST_SUCCESS,
      message:"liked or Unliked"
    }))
  }
  
  //  function handleUnlike(){
  //   dispatch(likesAndUnlike({
  //     postId:proms?.postId
  //  }))
  //  setLike(likes-1)

  // }

  return (
    <>
      <div class="flex flex-col space-y-1 font-mullish mt-3 shadow-lg p-6 pt-2 border  border-gray-300 rounded-2xl ">
        {/* //TODO  heading */}
        <div class="flex flex-row space-x-4 items-center">
          <div
            class=" cursor-pointer"
            onClick={() => navigate(`/profile/${proms?._id}`)}
          >
            <Avatar width="50px" heigth="50px" src={proms?.img} />
          </div>
          <h2 class="text-md  ">{proms?.name}</h2>
        </div>

        {/* //TODO content */}
        <div class="flex w-[100%] h-[400px] mt-5">
          <img src={proms?.postImg} alt="" class="w-[100%] rounded-2xl" />
        </div>
        {/* //? like and comment */}
        <div class="flex flex-col font-mullish space-y-2 ">
          <div class="flex flex-row font-mullish  border border-blue-300 max-w-[150px] px-2 rounded-lg bg-gray-300 space-x-5 items-center justify-center">
            <div className="flex justify-center  space-x-2  tems-center w-[70px]">
              {proms.isLiked ? (
                <button>
                  {" "}
                  <AiFillHeart
                    size={30}
                    style={{ color: "red" }}
                    onClick={handleLikes}
                  />
                </button>
              ) : (
                <button>
                  {" "}
                  <AiOutlineHeart size={30} onClick={handleLikes} />
                </button>
              )}
            </div>

            <h3 class="flex items-center text-md ">
              {proms.likesCount} <span className=" opacity-60 mx-3">Likes</span>{" "}
            </h3>
          </div>
          <p class="opacity-70">{proms?.caption}</p>
          <h4 class="text-md opacity-50">{proms.timeAgo} </h4>
        </div>
      </div>
    </>
  );
}

export default Post;
