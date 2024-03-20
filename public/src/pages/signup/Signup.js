import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import { useDispatch } from "react-redux";
import { showToast } from "../../redux/slices/appConfigSlice";
import { TOAST_SUCCESS } from "../../App";

function Signup() {
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  async function handleSignup(e) {
    e.preventDefault();
    try {
      const result = await axiosClient.post("/auth/signup", {
        email,
        password,
        name,
      });
      // setItem(Key_Access_Token,result.result.token)
      // console.log(result);
      if (result) {
        //
        navigate("/login");
      }
    } catch (e) {
      // console.log(process.env.REACT_APP_SERVER_BASE_URL);
      console.log(e);
    }
  }

  return (
    <div class=" flex justify-center items-center h-[100vh] w-full ">
      <div class="flex justify-center items-center max-h-[60vh] flex-col bg-gray-400 p-3 pr-6 min-w-[20%] rounded-2xl">
        <h2 class="bg-indigo-300 text-3xl font-bold rounded-md p-1 px-5 mb-4 ">
          Sign Up
        </h2>

        <form
          action=""
          onSubmit={handleSignup}
          class="flex flex-col space-y-2 "
        >
          <label htmlFor="name"> Name</label>
          <input
            type="text"
            name="name"
            id="name"
            class="rounded-md  p-1"
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
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
            onClick={handleSignup}
          >
            Submit
          </button>
        </form>

        <h3>
          Already have an Account ?{" "}
          <Link to="/login" class="underline mx-2 text-xl">
            Log In
          </Link>
        </h3>
      </div>
    </div>
  );
}

export default Signup;
