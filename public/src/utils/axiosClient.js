import axios from "axios";
import { deleteUser, getItem, Key_Access_Token, setItem } from "./localStorage";
import store from "../redux/store";
import { setLoading, showToast } from "../redux/slices/appConfigSlice";
import { TOAST_ERROR } from "../App";
export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  withCredentials: true,
});
axiosClient.interceptors.request.use((request) => {
  store.dispatch(setLoading(true));
  const accesstoken = getItem(Key_Access_Token);
  request.headers["Authorization"] = `Bearer ${accesstoken}`;
  return request;
});

axiosClient.interceptors.response.use(
  async (respone) => {
    const data = respone.data;
    store.dispatch(setLoading(false));
    if (data.status == "ok") {
      return data;
    }
    const statuscode = data.statuscode;
    const OriginalRequest = respone.config;
    const error = data.message;
    // console.log(error);
    store.dispatch(showToast({
      type:TOAST_ERROR,
      message:`${error}`
    })
    );
    // if(statuscode===401 && !OriginalRequest.retry){
    //   OriginalRequest
    //   const response=await axiosClient.get('/auth/refresh');
    //   console.log( "respone from backend",response);
    //   if(response.status=="ok"){
    //       setItem(Key_Access_Token , response.result.accestoken);
    //       OriginalRequest.headers["Authorization"]=`Bearer ${response.result.accestoken}`
    //       return  axios(OriginalRequest);

    //   }
    // }

    if (statuscode === 401 && !OriginalRequest._retry) {
      // means the access token has expired
      OriginalRequest._retry = true;

      const response = await axios
        .create({
          withCredentials: true,
        })
        .get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`);

      // console.log("respone from backend", response);
      if (response.data.status === "ok") {
        setItem(Key_Access_Token, response.data.result.accestoken);
        OriginalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.data.result.accestoken}`;

        return axios(OriginalRequest);
      } else {
        deleteUser(Key_Access_Token);
        window.location.replace("/login", "_self");

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
  async (error) => {
    store.dispatch(setLoading(false));
    store.dispatch(
      showToast({
        type: TOAST_ERROR,
        message: error.message,
      })
    );
    return Promise.reject(error);
  }
);
// axiosClient.interceptors.response.use(async (respone) => {
//   store.dispatch(setLoading(false));
//   const data = respone.data;
//   if (data.status === "ok") {
//       return data;
//   }

//   const originalRequest = respone.config;
//   const statusCode = data.statusCode;
//   const error = data.message

//   store.dispatch(showToast({
//       type: TOAST_ERROR,
//       message: error
//   }))

//   if (statusCode === 401 && !originalRequest._retry) {
// means the access token has expired
//       originalRequest._retry = true;

//       const response = await axios
//           .create({
//               withCredentials: true,
//           })
//           .get("http://localhost:3003/auth/refresh");

//       if (response.data.status === "ok") {
//           setItem(Key_Access_Token, response.data.result.accessToken);
//           originalRequest.headers[
//               "Authorization"
//           ] = `Bearer ${response.data.result.accessToken}`;

//           return axios(originalRequest);
//       } else {
//           deleteUser(Key_Access_Token);
//           window.location.replace("/login", "_self");
//           return Promise.reject(error);
//       }
//   }
//   return Promise.reject(error);
// }, async(error) => {
//   store.dispatch(setLoading(false));
//   store.dispatch(showToast({
//       type: TOAST_ERROR,
//       message: error.message
//   }))
//   return Promise.reject(error);
// });
