import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    try {
        const {
            jobTitle,
            jobDescription,
            jobRequirements,
            salary,
            jobLocation,
            employmentType,
            companyId,
            minExperience
        } = req.body;

        const userId = req.userId; // from authentication middleware

        // Validate all required fields
        if (
            !jobTitle || 
            !jobDescription || 
            !jobRequirements || 
            !salary || 
            !jobLocation || 
            !employmentType || 
            !companyId || 
            !minExperience
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        // Create job
        const job = await Job.create({
            jobTitle,
            jobDescription,
            jobRequirements: jobRequirements.split(",").map(req => req.trim()),
            salary: Number(salary),
            jobLocation,
            employmentType,
            companyId,
            minExperience,
            createdBy: userId
        });

        return res.status(201).json({
            success: true,
            message: "Job posted successfully.",
            job
        });

    } catch (error) {
        console.error("Error posting job:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};
