const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { error, success } = require("../utils/Wrapper");
const signupControlles = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  if (!email || !password || !name) {
    // return res.status(404).send("all fileds required");
    return res.send(error(403,("all fileds required")));
  }
  const olduser = await User.findOne({ email });
  if (olduser) {
    // return res.status(200).send("Already Exists");
    // return res.status(200).send("Already Exists");
    return res.send(error(402, "Already Exists"));
  }
  const hashpass = await bcrypt.hash(password, 10);
   await User.create({
    email,
    name,
    password: hashpass,
  });
  res.send(success(201, "user Created Succwssfully"));
};

const loginController = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    // return res.status(404).send("all fileds required");
    return res.send(error(402, "all fileds required"));
  }
  const olduser = await User?.findOne({ email })?.select("+password");
  if(!olduser){
    return res.send(error(404, "user not found"));
  }
  const verri = await bcrypt?.compare(password, olduser?.password);
  if (!verri) {
    // return res.status(401).send("Incorrect password");
    return res.send(error(403, "Incorrect password"));
  }

  const token = generateAccesstoken({ _id: olduser._id });
  const Referstoken = generateRefershtoken({ _id: olduser._id });
  res.cookie("jwt", Referstoken, {
    httponly: true,
    secure: true,
  });
  res.json(success(200, { token }));
};
const generateAccesstoken = (data) => {
  try {
    const token = jwt.sign(data, process.env.accessToken, {
      expiresIn: "1y",
    });

    return token;
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
const generateRefershtoken = (data) => {
  try {
    const token = jwt.sign(data, process.env.RefershToken, {
      expiresIn: "1y",
    });

    return token;
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const refreshController = async (req, res) => {
  const refreshToken = req.cookies.jwt;
  if (!refreshToken) {
    // return res.send("refresh token required");
    return res.send(error(401, "refresh token required"));
  }
  try {
    const verri = jwt.verify(refreshToken, process.env.RefershToken);
    const accestoken = generateAccesstoken({ _id: verri._id });
    res.json(success(200, { accestoken }));
  } catch (e) {
    // return res.send("invaild refresh key");

    return res.send(error(401, "invaild refresh key"));
  }
};

const logoutController = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httponly: true,
      secure: true,
    });
    res.send(success(200, "log Out"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
module.exports = {
  signupControlles,
  loginController,
  refreshController,
  logoutController,
};
