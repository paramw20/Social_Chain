const dbconnect = require("./Dbconnect");
const dotenv = require("dotenv");
dotenv.config("./.env");
const express = require("express");
const authRouter = require("./routers/authRouter");
const postRouter = require("./routers/postRouter");
const userRouter = require("./routers/userRouter");
const app = express();
const cookie = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
let Report = require('./models/Report')


// Configuration
cloudinary.config({
  cloud_name: process.env.Cloudinary_Cloud_Name,
  api_key: process.env.Cloudinary_API_Key,
  api_secret: process.env.Cloudinary_API_Secret,
});
app.use(morgan("common"));

app.use(express.json({ limit: "10mb" }));
app.use(cookie());
// app.use(cors());
let origin="http://localhost:3000"
app.use(
  cors({
    credentials: true,
    origin
  })
);
// app.use(cors({
//   credentials: true,
// }))
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);
app.get("/", (req, res) => {
  res.send("connected");
});
app.get('/report',async(req,res)=>{})
app.post('/report',async(req,res)=>{
  let data = new Report({url:req.body.img})
  await data.save();
  res.json(data)
})
dbconnect();
const port = process.env.port ||3003;
app.listen(port, (req, res) => {
  console.log(`server started on port ${port}`);
});