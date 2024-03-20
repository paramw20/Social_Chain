import React from "react";
import logo from "../../images/logo5.PNG";
import userIcon from "../../images/wordpress.png";
import Avatar from "../../components/avatar/Avatar";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";
import { Key_Access_Token, deleteUser } from "../../utils/localStorage";

function Navbar() {
  const navigate = useNavigate();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

  async function logout() {
    try {
      await axiosClient.post("/auth/logout");
      deleteUser(Key_Access_Token);
      navigate("/login");
    } catch (e) {
      return Promise.reject(e);
    }
  }

  return (
    <div className="bg-gradient-to-r from-deepBlue to-blue-500 p-2">
      <div className="container mx-auto flex justify-between items-center py-3">
        <img
          src={logo}
          alt="Logo"
          className="w-44 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="flex items-center space-x-5">
          <div className="cursor-pointer" onClick={() => navigate(`/profile/${myProfile?._id}`)}>
            <Avatar width="50px" height="50px" src={myProfile?.avatar?.url} />
          </div>
          <a href="/feed" target="_blank">
            <img
              src={userIcon}
              alt="User Icon"
              className="w-8 h-8 cursor-pointer"
              onClick={() => navigate(`/profile/${myProfile?._id}`)}
            />
          </a>
          <button onClick={logout} className="group relative">
            <AiOutlineLogout size={30} />
            <span className="absolute hidden top-12 group-hover:block text-white font-medium">
              Logout
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
