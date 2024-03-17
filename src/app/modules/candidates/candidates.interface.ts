import { Model } from "mongoose";

export type ICandidate = {
  _id?: string;
  name: string;
  email: string;
  gender: string;
  status: string;
};
export type ICandidateModel = Model<ICandidate, Record<string, unknown>>;

export enum ENUM_ROLE {
  SHORTLISTED = "shortlisted",
  REJECTED = "rejected",
}
