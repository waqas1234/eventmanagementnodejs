const { json } = require("express");
const Company = require("../models/CompanyModel");
const FollowedCompanies = require("../models/FollowedCompanies");

exports.getCompany = async (req, res) => {
  try {
    const userid = req.query.userid;

    const company = await Company.find();
    const result = await Promise.all(
      company.map(async (element) => {
        var followedcompanies = await FollowedCompanies.findOne({
          userid: userid,
          companyid: element._id,
        });
        if (followedcompanies) {
          return { ...element, followedcompanies: true };
        } else {
          return { ...element, followedcompanies: false };
        }
      })
    );

    const companies = result.map((element) => {
      return { ...element._doc, followedcompanies: element.followedcompanies };
    });

    res.status(200).json({
      status: "success",
      data: companies,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
