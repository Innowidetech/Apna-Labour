const express = require("express");
const router = express.Router();
const { getAllLandingPages, getTopBookedServices } = require("../controllers/landingPage.controller")

router.get("/", getAllLandingPages);
router.get("/top-booked-services", getTopBookedServices);
module.exports = router;