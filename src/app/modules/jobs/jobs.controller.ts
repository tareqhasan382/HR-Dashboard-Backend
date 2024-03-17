/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";

import JobModel from "./jobs.model";
const createJob = catchAsync(async (req, res) => {
  const data = req.body;
  console.log("body data:", data);
  try {
    if (!data.title || !data.description || !data.location || !data.salary) {
      return res.status(400).json({
        status: "false",
        message: "All fields are required",
        data: null,
      });
    }
    const result = await JobModel.create(data);
    return res.status(201).json({
      status: "true",
      message: "Job created successfully.",
      data: result,
    });
  } catch (error) {
    // console.error("Error creating job:", error);
    return res.status(500).json({
      status: "false",
      message: "Failed to create job.",
    });
  }
});
const Jobs = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await JobModel.find();
    if (result.length <= 0) {
      return res.status(404).json({
        status: "false",
        message: "No Job found.",
        data: [],
      });
    }
    // console.log("Data:", result.length);
    return res.status(200).json({
      status: "true",
      message: "Jobs retrieved successfully.",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: "false",
      message: "Failed to retrieve jobs.",
    });
  }
});
const RecentlyJobs = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await JobModel.find().sort({ createdAt: -1 }).limit(5);
    if (result.length <= 0) {
      return res.status(404).json({
        status: "false",
        message: "No Job found.",
        data: [],
      });
    }
    // console.log("Data:", result.length);
    return res.status(200).json({
      status: "true",
      message: "recent 5 Jobs retrieved successfully.",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: "false",
      message: "Failed to retrieve jobs.",
    });
  }
});
const DetailsJob = catchAsync(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        status: "false",
        message: "Job ID is required.",
        data: null,
      });
    }
    const result = await JobModel.findById({ _id: id });
    if (!result) {
      return res.status(404).json({
        status: "false",
        message: "Job not found.",
        data: null,
      });
    }
    return res.status(200).json({
      status: "true",
      message: "Job retrieved successfully.",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: "false",
      message: "Failed to retrieve job.",
    });
  }
});
const updateJob = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, location, salary } = req.body;
    if (!id) {
      return res.status(400).json({
        status: "false",
        message: "Job ID is required.",
        data: null,
      });
    }

    const updatedJob = await JobModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        location,
        salary,
      },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({
        status: "false",
        message: "Job not found.",
        data: null,
      });
    }

    return res.status(200).json({
      status: "true",
      message: "Job updated successfully.",
      data: updatedJob,
    });
  } catch (error) {
    // console.error("Error updating job:", error);
    return res.status(500).json({
      status: "false",
      message: "Failed to update job.",
    });
  }
});
const deleteJob = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: "false",
        message: "Job ID is required.",
        data: null,
      });
    }

    const deletedJob = await JobModel.findByIdAndDelete({ _id: id });

    if (!deletedJob) {
      return res.status(404).json({
        status: "false",
        message: "Job not found.",
        data: null,
      });
    }

    return res.status(200).json({
      status: "true",
      message: "Job deleted successfully.",
      data: null,
    });
  } catch (error) {
    // console.error("Error deleting job:", error);
    return res.status(500).json({
      status: "false",
      message: "Failed to delete job.",
    });
  }
});

export const JobController = {
  createJob,
  Jobs,
  RecentlyJobs,
  DetailsJob,
  updateJob,
  deleteJob,
};
