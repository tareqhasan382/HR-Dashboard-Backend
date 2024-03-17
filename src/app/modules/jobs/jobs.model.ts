import { Schema, model } from "mongoose";
import { IJob, IJobModel } from "./jobs.interface";
import { number } from "zod";
const jobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number, required: true },
  },
  { timestamps: true }
);

const JobModel = model<IJob, IJobModel>("Jobs", jobSchema);

export default JobModel;
