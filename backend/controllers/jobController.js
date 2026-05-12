const Job = require("../models/Job");

// CREATE JOB (Recruiter only)
const createJob = async (req, res) => {
  const { title, company, location, description, skillsRequired } = req.body;

  // check recruiter role
  if (req.user.role !== "recruiter") {
    return res.status(403).json({ message: "Only recruiters can post jobs" });
  }

  // validation
  if (!title || !company || !description) {
    return res.status(400).json({ message: "Please provide required fields" });
  }
  // duplicate check
  const existingJob = await Job.findOne({
    title,
    company,
    location
  });

  if (existingJob) {
    return res.status(400).json({
      message: "Job already exists"
    });
  }
  try {
    const job = await Job.create({
      title,
      company,
      location,
      description,
      skillsRequired,
      postedBy: req.user._id, // must match schema
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL JOBS
const getAllJob = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email");

    if (!jobs.length) {
      return res.status(404).json({
        message: "No jobs found",
      });
    }

    res.status(200).json({
      message: "Jobs fetched successfully",
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// GET SINGLE JOB
const getaJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("postedBy", "name email");

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job found successfully",
      data: job,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE JOB
const updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated doc
    );

    if (!updatedJob) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE JOB
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createJob,
  getAllJob,
  getaJob,
  updateJob,
  deleteJob,
};