const express = require("express");
const router = express.Router();
const { allDataController } = require("../controllers/allDataController");
router.get("/alldata", allDataController);
module.exports = router;
