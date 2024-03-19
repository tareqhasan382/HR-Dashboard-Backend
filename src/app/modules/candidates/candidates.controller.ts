/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import CandidateModel from "./candidates.model";
const createCandidate = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  // console.log("body data:", data);
  try {
    if (!data.name || !data.email || !data.gender) {
      return res.status(400).json({
        status: "false",
        message: "Name, email, and gender are required fields.",
        data: null,
      });
    }
    const result = await CandidateModel.create(data);
    return res.status(201).json({
      status: "true",
      message: "Candidate created successfully.",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: "false",
      message: "Failed to create candidate.",
    });
  }
});
const Candidates = async (req: Request, res: Response) => {
  try {
    const { page, limit, search, gender, status, sortOrder, sortField } =
      req.query;

    const query: any = {};
    if (search) {
      query.name = { $regex: new RegExp(search as string, "i") };
    }
    if (gender) {
      query.gender = gender;
    }
    if (status) {
      query.status = status;
    }

    const sort: any = {};
    if (sortOrder && sortField) {
      sort[sortField as string] = sortOrder === "asc" ? 1 : -1;
    }

    const count = await CandidateModel.countDocuments(query);

    const result = await CandidateModel.find(query)
      .sort(sort)
      .skip((parseInt(page as string) - 1) * parseInt(limit as string))
      .limit(parseInt(limit as string));

    if (result.length <= 0) {
      return res.status(404).json({
        status: "false",
        message: "No candidates found.",
        data: [],
      });
    }

    return res.status(200).json({
      status: "true",
      message: "Candidates retrieved successfully.",
      meta: {
        total: count,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
      },
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: "false",
      message: "Failed to retrieve candidates.",
    });
  }
};

export default Candidates;
const shortlistedCandidates = catchAsync(
  async (req: Request, res: Response) => {
    try {
      // const result = await CandidateModel.find();
      const result = await CandidateModel.find({ status: "shortlisted" });
      if (result.length <= 0) {
        return res.status(404).json({
          status: "false",
          message: "No candidates found.",
          data: [],
        });
      }
      // console.log("Data:", result.length);
      return res.status(200).json({
        status: "true",
        message: "Candidates retrieved successfully.",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        status: "false",
        message: "Failed to retrieve candidates.",
      });
    }
  }
);
const RejectedCandidates = catchAsync(async (req: Request, res: Response) => {
  try {
    // const result = await CandidateModel.find();
    const result = await CandidateModel.find({ status: "rejected" });
    if (result.length <= 0) {
      return res.status(404).json({
        status: "false",
        message: "No candidates found.",
        data: [],
      });
    }
    // console.log("Data:", result.length);
    return res.status(200).json({
      status: "true",
      message: "Candidates retrieved successfully.",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: "false",
      message: "Failed to retrieve candidates.",
    });
  }
});
const Rejected = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({
      status: "false",
      message: "Candidate ID is required.",
      data: [],
    });
  }
  try {
    const result = await CandidateModel.findOneAndUpdate(
      { _id: id },
      { $set: { status: "rejected" } },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({
        status: "false",
        message: "No candidate found with the provided ID.",
        data: [],
      });
    }
    return res.status(200).json({
      status: "true",
      message: "Candidate rejected successfully.",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: "false",
      message: "Failed to rejected candidate.",
    });
  }
});
const getByGender = catchAsync(async (req: Request, res: Response) => {
  const { gender } = req.params;
  if (!gender) {
    return res.status(404).json({
      status: "false",
      message: "Candidate Gender is required.",
      data: [],
    });
  }
  try {
    const result = await CandidateModel.find({ gender: gender });
    if (result.length <= 0) {
      return res.status(404).json({
        status: "false",
        message: "No candidates found.",
        data: [],
      });
    }
    // console.log("Data:", result.length);
    return res.status(200).json({
      status: "true",
      message: "Candidates Gender by retrieved successfully.",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: "false",
      message: "Failed to retrieve candidates.",
    });
  }
});
const updateCandidate = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, gender, status } = req.body;
    if (!id) {
      return res.status(400).json({
        status: "false",
        message: "Candidate ID is required.",
        data: null,
      });
    }

    const updatedCandidate = await CandidateModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        gender,
        status,
      },
      { new: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({
        status: "false",
        message: "Candidate not found.",
        data: null,
      });
    }

    return res.status(200).json({
      status: "true",
      message: "Candidate updated successfully.",
      data: updatedCandidate,
    });
  } catch (error) {
    // console.error("Error updating job:", error);
    return res.status(500).json({
      status: "false",
      message: "Failed to update candidate.",
    });
  }
});
const deleteCandidate = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: "false",
        message: "Candidate ID is required.",
        data: null,
      });
    }

    const deletedJob = await CandidateModel.findByIdAndDelete({ _id: id });

    if (!deletedJob) {
      return res.status(404).json({
        status: "false",
        message: "Candidate not found.",
        data: null,
      });
    }

    return res.status(200).json({
      status: "true",
      message: "Candidate deleted successfully.",
      data: null,
    });
  } catch (error) {
    // console.error("Error deleting job:", error);
    return res.status(500).json({
      status: "false",
      message: "Failed to delete Candidate.",
    });
  }
});
export const CandidateController = {
  createCandidate,
  Candidates,
  RejectedCandidates,
  shortlistedCandidates,
  Rejected,
  getByGender,
  updateCandidate,
  deleteCandidate,
};
