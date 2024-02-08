const express = require("express");
const router = express.Router();
const {
  allDataController,
  searchController,
} = require("../controllers/allDataController");
router.get("/alldata", allDataController);
router.get("/searchData", searchController);
module.exports = router;
