const Company = require("../models/CompanyModel");
const UserModel = require("../models/UserModel");
const Events = require("../models/EventsModel");
const EventRequestModel = require("../models/EventRequestModel");

exports.addEvent = async (req, res) => {
  try {
    Events.create({
      companyid: req.body.userid,
      event: req.body.event,
      time: req.body.time,
      date: req.body.date,
      location: req.body.location,
      detail: req.body.detail,
    });
    res.status(200).json({
      status: "success",
      message: "Event added successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Event not added",
    });
  }
};

exports.getEvents = async (req, res) => {
  try {
    var type = req.query.type;
    const events = await Events.find(
      type == "company"
        ? {
            companyid: req.query.userid,
          }
        : null
    );
    const userid = req.query.userid;
    const result = await Promise.all(
      events.map(async (element) => {
        var requestedevents = await EventRequestModel.findOne({
          userid: userid,
          eventid: element._id,
        });

        var isapproved = await EventRequestModel.findOne({
          userid: userid,
          eventid: element._id,
        });

        if (isapproved) {
          isapproved = isapproved.status === "approved" ? true : false;
        } else {
          isapproved = false;
        }

        if (requestedevents) {
          return {
            ...element,
            requestedevents: true,
            isapproved: isapproved,
          };
        } else {
          return { ...element, requestedevents: false, isapproved: false };
        }
      })
    );
    const eventslist = result.map((element) => {
      return {
        ...element._doc,
        requestedevents: element.requestedevents,
        isapproved: element.isapproved,
      };
    });

    res.status(200).json({
      status: "success",
      data: eventslist,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getSingleEvent = async (req, res) => {
  try {
    await Events.findById(req.query.id)
      .then((response) => {
        res.status(200).json({
          status: "success",
          data: response,
        });
      })
      .catch((error) => {
        res.status(400).json({
          status: "fail",
          message: error,
        });
      });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.editEvent = async (req, res) => {
  try {
    await Events.findByIdAndUpdate(req.body.id, {
      event: req.body.event,
      time: req.body.time,
      date: req.body.date,
      location: req.body.location,
      detail: req.body.detail,
    }).then((response) => {
      res.status(200).json({
        status: "success",
        message: "Event updated successfully",
      });
    });

    res.status(400).json({
      status: "fail",
      message: "Event not updated",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.eventRequest = async (req, res) => {
  try {
    await EventRequestModel.create({
      eventid: req.body.eventid.eventid,
      companyid: req.body.eventid.companyid,
      userid: req.body.userid,
    })
      .then((response) => {
        res.status(200).json({
          status: "success",
          message: "Event request sent successfully",
        });
      })
      .catch((error) => {
        res.status(200).json({
          status: "fail",
          message: "Event request not sent",
        });
      });
  } catch (error) {
    console.log(error);
  }
};

exports.eventRequestStatus = async (req, res) => {
  try {
    const requestModel = await EventRequestModel.find({
      companyid: req.body.userid,
    });
    const result = await Promise.all(
      requestModel.map(async (element) => {
        var requestModel = await Events.findOne({
          _id: element.eventid,
        });
        var requestuser = await UserModel.findOne({
          _id: element.userid,
        });

        if (requestModel && requestuser) {
          return { ...element, requestModel, requestuser };
        } else {
          return { ...element, requestModel: null, requestuser: null };
        }
      })
    );

    const requestedeventslist = result.map((element) => {
      return {
        ...element._doc,
        requestModel: element.requestModel,
        requestuser: element.requestuser.name,
      };
    });

    res.status(200).json({
      status: "success",
      data: requestedeventslist,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.approveEventRequest = async (req, res) => {
  try {
    const approverequest = await EventRequestModel.findOneAndUpdate(
      {
        eventid: req.body.eventid,
      },
      {
        status: "approved",
      }
    );
    if (approverequest) {
      res.status(200).json({
        status: "success",
        message: "Event request approved successfully",
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Event request not approved",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
