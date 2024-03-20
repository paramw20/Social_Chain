const express = require("express");
const router = express.Router();
const postContoller = require("../controllers/postContollers");

const logger = require("../middlewares/logger");
const route = require("express").Router();

route.get("/all", logger, postContoller.alll);
route.post("/", logger, postContoller.createPostController);
route.post("/like", logger, postContoller.likeUnlikeController);
route.put("/", logger, postContoller.updatePostController);
route.delete("/", logger, postContoller.deletePostController);

module.exports = route;
