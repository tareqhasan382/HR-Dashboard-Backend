import { Schema, model } from "mongoose";
import { ICandidate, ICandidateModel } from "./candidates.interface";

const candidateSchema = new Schema<ICandidate>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    status: {
      type: String,
      enum: ["shortlisted", "rejected"],
      default: "shortlisted",
    },
  },
  { timestamps: true }
);

const CandidateModel = model<ICandidate, ICandidateModel>(
  "Candidates",
  candidateSchema
);

export default CandidateModel;
