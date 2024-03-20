import React, { useState } from "react";
import { axiosClient } from "../../utils/axiosClient";

import { Link, useNavigate } from "react-router-dom";
import { Key_Access_Token, setItem } from "../../utils/localStorage";
import { useDispatch } from "react-redux";
import { showToast } from "../../redux/slices/appConfigSlice";
import { TOAST_SUCCESS } from "../../App";
function Login() {
  const navigate=useNavigate()
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
 
  async function submitHandle(e) {
    e.preventDefault();

    try {
      const result = await axiosClient.post("/auth/login", {
        email,
        password,
      });
      setItem(Key_Access_Token,result.result.token)
    // console.log(result);
    if(result){
     
      navigate('/')
    }
    } catch (e) {
      // console.log(process.env.REACT_APP_SERVER_BASE_URL);
      console.log(e);
    }
  }

  return (
    <div class=" flex justify-center items-center h-[60vh] max-h-[100vh] w-full ">
      <div class="flex justify-center items-center h-[40vh] flex-col bg-gray-400 p-3 pr-6 min-w-[20%] rounded-2xl">
        <h2 class="bg-indigo-300 text-3xl font-bold rounded-md p-1 px-5 mb-4 ">
          login
        </h2>
  
        <form action="" class="flex flex-col space-y-2 " onSubmit={submitHandle}>
          <label htmlFor="email"> Email</label>
          <input
            type="email"
            name="email"
            id="email"
            class="rounded-md  p-1"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <label htmlFor="password"> password</label>
          <input
            type="password"
            name="password"
            id="password"
            class="rounded-md  p-1"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <button
            class="bg-blue-400 rounded-md  p-1 px-2 flex  mx-auto hover:bg-blue-500"
            onClick={submitHandle}
          >
            Submit
          </button>
        </form>

        <h3>
          Do not have Account ?{" "}
          <Link to="/signup" class="underline mx-2 text-xl">
            Sign Up
          </Link>
        </h3>
      </div>
    </div>
  );
}

export default Login;
