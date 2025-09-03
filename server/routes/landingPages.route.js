const express = require("express")
const router = express.Router();
const { getAllLandingPages } = require("../controllers/landingPage.controller")

router.get("/", getAllLandingPages)

module.exports = router;