import React, { useEffect } from "react";

import Navbar from "../../components/navbar/Navbar";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMyInfo } from "../../redux/slices/appConfigSlice";



// import axios from "axios";
function Home() {
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getFeedData());
    dispatch(getMyInfo());
    // dispatch(
    //   getUserProfile({
    //     userId: params?.userId,
    //   })
    // );
  }, [dispatch, params.userId]);
  return (
    <div class="overflow-hidden" >
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Home;
