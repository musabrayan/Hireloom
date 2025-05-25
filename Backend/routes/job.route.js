import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createJob, getJobById, getJobs, JobsCreatedByAdmin} from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, createJob)
router.route("/get").get(isAuthenticated, getJobs)
router.route("/getadminjobs").get(isAuthenticated, JobsCreatedByAdmin)
router.route("/get/:id").get(isAuthenticated, getJobById)


export default router;