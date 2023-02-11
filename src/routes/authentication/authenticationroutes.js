const express = require("express");
const router = express.Router();
// controllers //
const UserController = require("../../controllers/UserController");
// routes //
// add route groups

const adduserGroup = "/api/user";

router.post(adduserGroup + "/register", UserController.addUser);
router.post(adduserGroup + "/login", UserController.signin);
router.post(adduserGroup + "/follow-company", UserController.followCompany);
router.post(adduserGroup + "/unfollow-company", UserController.unfollowCompany);
module.exports = router;
