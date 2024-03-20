import React from "react";
import { Key_Access_Token, getItem } from "../utils/localStorage";
import { Navigate, Outlet } from "react-router-dom";

function LoginCheck() {
  const user = getItem(Key_Access_Token);

  return user ? <Navigate to="/" />: <Outlet />;
}

export default LoginCheck;
