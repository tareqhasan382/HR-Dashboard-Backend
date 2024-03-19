import express from "express";
import { JobController } from "./jobs.controller";

const router = express.Router();
router.post("/job/create", JobController.createJob);
router.get("/job/jobs", JobController.Jobs);
router.get("/job/recentlyJobs", JobController.RecentlyJobs);
router.get("/job/detailsJob/:id", JobController.DetailsJob);
router.patch("/job/updateJob/:id", JobController.updateJob);
router.delete("/job/deleteJob/:id", JobController.deleteJob);
export const JobRoute = router;

// detailsJob

// updateJob
