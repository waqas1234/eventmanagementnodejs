const express = require("express");
const router = express.Router();

// controllers //

const EventsController = require("../../controllers/EventsController");

const addEventGroup = "/api/event";
router.post(addEventGroup + "/add-event", EventsController.addEvent);
router.get(addEventGroup + "/get-events", EventsController.getEvents);
router.post(addEventGroup + "/edit-event", EventsController.editEvent);
router.get(
  addEventGroup + "/get-single-event",
  EventsController.getSingleEvent
);
router.post(addEventGroup + "/event-request", EventsController.eventRequest);
router.post(
  addEventGroup + "/event-request-status",
  EventsController.eventRequestStatus
);

router.post(
  addEventGroup + "/approve-event-request",
  EventsController.approveEventRequest
);
module.exports = router;
