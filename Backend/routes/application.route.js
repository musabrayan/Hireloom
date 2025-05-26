import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyToJob, getJobApplicants, getUserAppliedJobs, updateApplicationStatus } from "../controllers/application.controller.js";


const router = express.Router();

router.route("/apply/:id").get(isAuthenticated,applyToJob)
router.route("/get").get(isAuthenticated,getUserAppliedJobs)
router.route("/:id/applicants").get(isAuthenticated,getJobApplicants)
router.route("/status/:id/update").post(isAuthenticated,updateApplicationStatus)

export default router;