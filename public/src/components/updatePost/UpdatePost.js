import Avatar from "../avatar/Avatar";
import img1 from "../../images/avad.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteMyAccount,
  updateMyProfile,
} from "../../redux/slices/appConfigSlice";
import { useNavigate } from "react-router-dom";
import { Key_Access_Token, deleteUser } from "../../utils/localStorage";
import { axiosClient } from "../../utils/axiosClient";

function UpdatePost() {
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const [name, setname] = useState("");
  const [bio, setbio] = useState("");
  const [imgURL, setimgURL] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setname(myProfile?.name || "");
    setbio(myProfile?.bio || "");
    setimgURL(myProfile?.avatar?.url || "");
  }, [myProfile]);

  function handleImgae(e) {
    try {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        if (fileReader?.readyState === fileReader?.DONE) {
          setimgURL(fileReader.result ? fileReader.result : img1);
          // console.log(fileReader.result);
        }
      };
    } catch (e) {
      console.log(e);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      updateMyProfile({
        name,
        bio,
        imgURL,
      })
    );
  }
 async function deleteAccount() {
    dispatch(deleteMyAccount());
    // deleteUser(Key_Access_Token);
    await axiosClient.post("/auth/logout");
    deleteUser(Key_Access_Token);
   
    navigate("/login");
  }
  return (
    <>
      <div class="w-[50%] mx-auto  flex flex-row">
        <div>
          <label htmlFor="InputImg" class="cursor-pointer ">
            <Avatar width="100px" heigth="100px" src={imgURL ? imgURL : img1} />
          </label>
          <input
            type="file"
            accept="image/*"
            id="InputImg"
            class="hidden"
            onChange={handleImgae}
          />
          <span class="block font-mullish">upload imgae</span>
          <span class="block font-mullish">max-size:10MB</span>
        </div>

        <form
          class="flex flex-col w-[70%] items-center "
          onSubmit={handleSubmit}
        >
          <label htmlFor="name"></label>
          <input
            type="text"
            value={name}
            placeholder="enter your name"
            onChange={(e) => {
              setname(e.target.value);
            }}
            id="name"
            class="block w-[60%] p-3  rounded-2xl border border-blue-300 m-1"
          />

          <label htmlFor="bio"></label>
          <input
            type="text"
            value={bio}
            placeholder="your Bio"
            id="bio"
            onChange={(e) => {
              setbio(e.target.value);
            }}
            class="block w-[60%]  p-3 rounded-2xl border border-blue-300 m-1"
          />
          <button
            class="bg-blue-600 p-2 text-white  text-xl font-bold rounded-lg m-2 hover:bg-blue-700 w-auto object-fill transition-all duration-200 "
            onClick={handleSubmit}
          >
            Update{" "}
          </button>
          <button
            onClick={deleteAccount}
            class="bg-red-700 p-2 text-white  text-xl font-bold rounded-lg m-2 hover:bg-red-500 w-auto object-fill transition-all duration-200 "
          >
            Delete Account{" "}
          </button>
        </form>
      </div>

      {/* <div> */}
      {/* <div class="flex items-center space-x-2 text-base">
    <h4 class="font-semibold text-slate-900">Contributors</h4>
    <span class="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">204</span>
  </div>
  <div class="mt-3 flex -space-x-2 overflow-hidden">
    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt=""/>
    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
  </div>
  <div class="mt-3 text-sm font-medium">
    <a href="#" class="text-blue-500">+ 198 others</a>
  </div>
</div> */}
    </>
  );
}

export default UpdatePost;
