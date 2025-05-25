import { Job } from "../models/job.model.js";

export const createJob = async (req, res) => {
    try {
        const {
            jobTitle,
            jobDescription,
            jobRequirements,
            salary,
            jobLocation,
            employmentType,
            companyId,
            openPositions,
            minExperience
        } = req.body;

        const userId = req.userId; // from auth middleware

        // Validate all required fields
        if (
            !jobTitle || 
            !jobDescription || 
            !jobRequirements || 
            !salary || 
            !jobLocation || 
            !employmentType || 
            !companyId || 
            !openPositions ||
            !minExperience
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        // Create new job
        const job = await Job.create({
            jobTitle,
            jobDescription,
            jobRequirements: jobRequirements.split(",").map(req => req.trim()),
            salary: Number(salary),
            jobLocation,
            employmentType,
            companyId,
            minExperience: Number(minExperience),
            openPositions: Number(openPositions),
            createdBy: userId  // changed from postedBy to createdBy for consistency
        });

        return res.status(201).json({
            success: true,
            message: "Job posted successfully.",
            job
        });

    } catch (error) {
        console.error("Error creating job:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message
        });
    }
};

export const getJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const searchQuery = {
            $or: [
                { jobTitle: { $regex: keyword, $options: "i" } },
                { jobDescription: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(searchQuery)
                              .populate("companyId")
                              .sort({ createdAt: -1 });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No jobs found."
            });
        }

        return res.status(200).json({
            success: true,
            jobs
        });

    } catch (error) {
        console.error("Error fetching jobs:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate("companyId");

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found."
            });
        }

        return res.status(200).json({
            success: true,
            job
        });

    } catch (error) {
        console.error("Error fetching job by ID:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

export const JobsCreatedByAdmin = async (req, res) => {
    try {
        console.log(req.userId);
        
        const adminId = req.userId;  
        const jobs = await Job.find({ postedBy: adminId }).populate("companyId").sort({ createdAt: -1 });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No jobs found for this user."
            });
        }

        return res.status(200).json({
            success: true,
            jobs
        });

    } catch (error) {
        console.error("Error fetching jobs by user:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message
        });
    }
};
