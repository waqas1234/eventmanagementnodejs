//
const User = require("../models/UserModel");
const Company = require("../models/CompanyModel");
const FollowedCompanies = require("../models/FollowedCompanies");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register User //

exports.addUser = async (req, res) => {
  try {
    const saltRounds = 10;
    const userPassword = req.body.password;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(userPassword, salt);
    req.body.password = hash;

    const RegistrationType = req.body.type;

    if (RegistrationType === "company") {
      Company.findOne({ email: req.body.email }, function (err, user) {
        if (user) {
          return res.status(200).json({
            status: "alreadyexist",
            message: "Company already exists",
          });
        } else {
          Company.create({
            name: req.body.name,
            type: req.body.type,
            email: req.body.email,
            password: req.body.password,
            token: null,
          });

          res.status(200).json({
            status: "success",
            message: "Company added successfully",
          });
        }
      });
    } else if (RegistrationType === "user") {
      User.findOne({ email: req.body.email }, function (err, user) {
        if (user) {
          return res.status(200).json({
            status: "alreadyexist",
            message: "User already exists",
          });
        } else {
          User.create({
            name: req.body.name,
            type: req.body.type,
            email: req.body.email,
            password: req.body.password,
            token: null,
          });

          res.status(200).json({
            status: "success",
            message: "User added successfully",
          });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const userPassword = req.body.password;
    const LoginType = req.body.type;

    if (LoginType === "user") {
      User.findOne({ email: req.body.email }, function (err, user) {
        if (user) {
          const updatedUser = {};
          updatedUser.token = jwt.sign({ foo: "bar" }, "shhhhh");
          const token = updatedUser.token;
          bcrypt.compare(userPassword, user.password).then(function (result) {
            if (result === true) {
              User.findByIdAndUpdate(
                user._id,
                updatedUser,
                function (err, updatedUser) {
                  if (err) {
                    res.status(400).json({
                      status: "fail",
                      message: err,
                    });
                  } else {
                    res.status(200).json({
                      status: "success",
                      message: "User logged in successfully",
                      userid: user._id,
                      user: user.email,
                      type: user.type,
                      token: token,
                    });
                  }
                }
              );
            } else {
              res.status(200).json({
                status: "fail",
                message: "Password is incorrect",
              });
            }
          });
        } else {
          res.status(200).json({
            status: "fail",
            message: "User not found",
          });
        }
      });
    } else if (LoginType === "company") {
      Company.findOne({ email: req.body.email }, function (err, user) {
        if (user) {
          const updateCompany = {};
          updateCompany.token = jwt.sign({ foo: "bar" }, "shhhhh");
          const token = updateCompany.token;
          bcrypt.compare(userPassword, user.password).then(function (result) {
            if (result === true) {
              Company.findByIdAndUpdate(
                user._id,
                updateCompany,
                function (err, updatedUser) {
                  if (err) {
                    res.status(400).json({
                      status: "fail",
                      message: err,
                    });
                  } else {
                    res.status(200).json({
                      status: "success",
                      message: "Company logged in successfully",
                      userid: user._id,
                      user: user.email,
                      type: user.type,
                      token: token,
                    });
                  }
                }
              );
            } else {
              res.status(200).json({
                status: "fail",
                message: "Password is incorrect",
              });
            }
          });
        } else {
          res.status(200).json({
            status: "fail",
            message: "Company not found",
          });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
// Sign In User //

// Follow Company //

exports.followCompany = async (req, res) => {
  try {
    FollowedCompanies.create({
      userid: req.body.userid,
      companyid: req.body.companyid,
    });

    res.status(200).json({
      status: "success",
      message: "Company followed successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

// unfollow Company //

exports.unfollowCompany = async (req, res) => {
  try {
    await FollowedCompanies.deleteOne({
      userid: req.body.userid,
      companyid: req.body.companyid,
    });

    res.status(200).json({
      status: "success",
      message: "Company unfollowed successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
