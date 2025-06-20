import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createJob, getJobById, getJobs, JobsCreatedByAdmin, updateJob} from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, createJob)
router.route("/get").get(getJobs)
router.route("/getadminjobs").get(isAuthenticated, JobsCreatedByAdmin)
router.route("/get/:id").get(isAuthenticated, getJobById)
router.route("/update/:id").put(isAuthenticated, updateJob);


export default router;