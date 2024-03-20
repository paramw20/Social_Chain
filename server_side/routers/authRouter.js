const {
  signupControlles,
  loginController,
  refreshController,
  logoutController,
} = require("../controllers/authControllers");

const route = require("express").Router();

route.post("/signup", signupControlles);
route.post("/login", loginController);
route.get("/refresh", refreshController);
route.post("/logout", logoutController);

module.exports = route;
