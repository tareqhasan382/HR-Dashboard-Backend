import express from "express";
import { CandidateController } from "./candidates.controller";

const router = express.Router();
router.post("/candidate/create", CandidateController.createCandidate);
router.get("/candidate/candidates", CandidateController.Candidates);
router.get("/candidate/shortlisted", CandidateController.shortlistedCandidates);
router.get("/candidate/getRejected", CandidateController.RejectedCandidates);
router.patch("/candidate/rejected/:id", CandidateController.Rejected);
router.get("/candidate/getByGender/:gender", CandidateController.getByGender);
router.patch(
  "/candidate/updateCandidate/:id",
  CandidateController.updateCandidate
);
router.delete(
  "/candidate/deleteCandidate/:id",
  CandidateController.deleteCandidate
);
export const CandidateRoute = router;

// http://localhost:5000/api/v1/candidate/create

// getByGender

// updateCandidate

// deleteCandidate
