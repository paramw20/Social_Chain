import React from "react";

import { Navigate, Outlet } from "react-router";
// import Login from '../pages/login/Login';
import { Key_Access_Token, getItem } from "../utils/localStorage";

function UserRequire() {
  const user = getItem(Key_Access_Token);
  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default UserRequire;
