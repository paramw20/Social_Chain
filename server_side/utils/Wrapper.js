const success = (statuscode, result) => {
  return {
    status: "ok",
    statuscode,
    result,
  };
};
const error = (statuscode, message) => {
  return {
    status: "error",
    statuscode,
    message,
  };
};

module.exports = { success, error };

//     accessToken=4a6935299ca6bf3b550c586921c063c1
// RefershToken=9b7743d497948e0e8392466d09d28718
// Cloudinary_Cloud_Name=dufi9bxnq
// Cloudinary_API_Key=297821634815286
// Cloudinary_API_Secret=dFxVC-aR6jbm1Li8BAmplSVMavg
// MongoBD_api=mongodb+srv://vipinkumawat:Z0kbEaGit73ewzGu@cluster0.7xa9bem.mongodb.net/?retryWrites=true&w=majority
// NODE_VERSION=14.20.1
