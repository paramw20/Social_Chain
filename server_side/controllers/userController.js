const Post = require("../models/Post");
const User = require("../models/User");
const { mapPostOuptput } = require("../utils/Utils");
const { success, error } = require("../utils/Wrapper");
const cloudinary = require("cloudinary").v2;
const followUnfollowController = async (req, res) => {
  try {
    const { userIdToFollow } = req.body;
    const curUserId = req._id;
// console.log(userIdToFollow);
    const userToFollow = await User.findById(userIdToFollow);
    const curUser = await User.findById(curUserId);

    if (curUserId === userIdToFollow) {
      return res.send(error(409, "Users cannot follow themselves"));
    }

    if (!userToFollow) {
      return res.send(error(404, "User to follow not found"));
    }

    if (curUser.followings.includes(userIdToFollow)) {
      // already followed
      const followingIndex = curUser.followings.indexOf(userIdToFollow);
      curUser.followings.splice(followingIndex, 1);

      const followerIndex = userToFollow.followers.indexOf(curUser);
      userToFollow.followers.splice(followerIndex, 1);
    } else {
      userToFollow.followers.push(curUserId);
      curUser.followings.push(userIdToFollow);
    }

    await userToFollow.save();
    await curUser.save();

    return res.send(success(200, { user: userToFollow }));
  } catch (e) {
    // console.log(e);
    return res.send(error(500, e.message));
  }
};
const getAllPostOfMyFollowingsController = async (req, res) => {
  try {
    const curUserId = req._id;
    const curuser = await User.findById(curUserId).populate("followings");
    const fullPosts = await Post.find({
      owner: {
        $in: curuser.followings,
      },
    }).populate("owner");

    const posts =
      fullPosts &&
      fullPosts.map((item) => mapPostOuptput(item, req._id)).reverse();
    // console.log("vipiin",fullPosts);
    const followingIds =
      curuser.followings && curuser.followings.map((item) => item._id);
    const suggestions = await User.find({
      _id: {
        $nin: followingIds,
        $ne:req._id
      },
      
    });
    return res.send(success(200, { ...curuser._doc, suggestions, posts }));
  } catch (e) {
    console.log(e);
    return res.send(error(500, e.message));
  }
};

const geMyPostController = async (req, res) => {
  try {
    const curUserId = req._id;
    const curUser = await User.findById(curUserId);
    if (!curUser) {
      return res.send(error(404, "User not found in database"));
    }
    const post = await Post.find({
      owner: curUserId,
    }).populate("likes");
    // await posts.save()

    return res.send(success(200, { post }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getAllPostOfUser = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      return res.send(error(400, "userId is Requried"));
    }
    const posts = await Post.find({
      owner: userId,
    }).populate("likes");
    return res.send(success(200, { posts }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
const deleteMyProflie = async (req, res) => {
  try {
    const curUserId = req._id;
    const curUser = await User.findById(curUserId);
    //* deleting all post
    await Post.deleteMany({
      owner: curUserId,
    });
    //? deleting myself from my follower's following list
    const deleteMe = async (followerId) => {
      const followerUser = await User.findById(followerId);

      if (followerUser.followings.length == 0) {
        return;
      }
      const index = followerUser.followings.indexOf(curUserId);
      followerUser.followings.splice(index, 1);

      await followerUser.save();
    };
    curUser.followers.forEach((followerId) => {
      deleteMe(followerId);
    });

    //? deleting myfollower from my following list
    const deleteFromMYList = async (followingId) => {
      const followingUser = await User.findById(followingId);
      if (followingUser.followers.length == 0) {
        return;
      }

      const index = followingUser.followers.indexOf(curUserId);
      followingUser.followers.splice(index, 1);

      await followingUser.save();
    };
    curUser.followings.forEach((followingId) => {
      deleteFromMYList(followingId);
    });

    // TODO  remove likes from all the post

    const removelike = async (post) => {
      const index = post.likes.indexOf(curUserId);
      post.likes.splice(index, 1);
      await post.save();
    };
    const allpost = await Post.find();
    allpost.forEach((post) => {
      removelike(post);
    });

    await curUser.deleteOne();
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
    });

    return res.send(success(200, "myProfile Deleted Successfully"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
const getMyInfoController = async (req, res) => {
  try {
    const curUser = await User.findById(req._id);
    return res.send(success(200, { curUser }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const updateMyProfileContoller = async (req, res) => {
  try {
    const { bio, name, imgURL } = req.body;
    const curUser = await User.findById(req._id);
    if (name) {
      curUser.name = name;
    }

    if (bio) {
      curUser.bio = bio;
    }
    if (imgURL) {
      const cloudimg = await cloudinary.uploader.upload(imgURL, {
        folder: "userProfile",
      });

      curUser.avatar = {
        url: cloudimg.secure_url,
        publicId: cloudimg.public_id,
      };
    }
    await curUser.save();
    return res.send(success(200, { curUser }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getUserProflie = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      return res.send(error(400, "userId is required"));
    }
    const user = await User.findById(userId).populate({
      path: "posts",
      populate: {
        path: "owner",
      },
    });

    const fullPost = user.posts;
    const posts =
      fullPost &&
      fullPost.map((item) => mapPostOuptput(item, req._id)).reverse();
    return res.send(success(200, { ...user._doc, posts }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
module.exports = {
  followUnfollowController,
  getAllPostOfMyFollowingsController,
  geMyPostController,
  getAllPostOfUser,
  deleteMyProflie,
  getMyInfoController,
  updateMyProfileContoller,
  getUserProflie,
};
