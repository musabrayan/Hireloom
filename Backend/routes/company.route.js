import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompanyById, getMyCompanies, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/multer.js";
const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany)
router.route("/get").get(isAuthenticated, getMyCompanies)
router.route("/get/:id").get(isAuthenticated, getCompanyById)
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany)


export default router;