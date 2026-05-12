const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createJob,
  deleteJob,
  getAllJob,
  getaJob,
} = require("../controllers/jobController");

// recruiter creates job
router.post("/createJob", protect, createJob);

// public routes
router.get("/getAllJob", getAllJob);
router.get("/getaJob/:id", getaJob);

// recruiter delete job
router.delete("/:id", protect, deleteJob);

module.exports = router;