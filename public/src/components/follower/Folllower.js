import React from "react";
import Avatar from "../avatar/Avatar";
import { useDispatch } from "react-redux";
import { followFeedData } from "../../redux/slices/feedSlice";
import { useNavigate } from "react-router-dom";

function Folllower(props) {
  const dispatch = useDispatch();
const navigate=useNavigate()
  // console.log("iddddd",props._id);
  function handlefollow() {
    dispatch(
      followFeedData({
        userIdToFollow: props?._id,
      })
    );
  }
  return (
    <>
      <div class="flex flex-row space-x-4  justify-between items-center">
        <div class="flex flex-row space-x-5  items-center cursor-pointer" onClick={()=>navigate(`/profile/${props._id}`)}>
          <Avatar width="50px" heigth="50px" src={props?.img}  />
          <h2 class="text-md  ">{props?.name}</h2>
        </div>
        <button
          onClick={handlefollow}
          class="text-lightBlue300  text-lg transition-all duration-500 hover:text-blue-700  "
        >
          {props?.follow}
        </button>
      </div>
    </>
  );
}

export default Folllower;
