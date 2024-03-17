import { Model } from "mongoose";

export type IJob = {
  _id?: string;
  title: string;
  description: string;
  location: string;
  salary: number;
};
export type IJobModel = Model<IJob, Record<string, unknown>>;
