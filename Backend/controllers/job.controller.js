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

        const userId = req.userId; 

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
            postedBy: userId  
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
        const job = await Job.findById(jobId).populate({
            path: "applications"
        });

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
        const adminId = req.userId;  
        const jobs = await Job.find({ postedBy: adminId }).populate({
            path:'companyId'
        })

        if (!jobs || jobs?.length === 0) {
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

export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
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

        // Find job first
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found." });
        }
        
        // Update fields if provided
        if (jobTitle) job.jobTitle = jobTitle;
        if (jobDescription) job.jobDescription = jobDescription;
        if (jobRequirements) job.jobRequirements = jobRequirements.split(",").map(req => req.trim()); 
        if (salary) job.salary = Number(salary);
        if (jobLocation) job.jobLocation = jobLocation;
        if (employmentType) job.employmentType = employmentType;
        if (companyId) job.companyId = companyId;
        if (openPositions) job.openPositions = Number(openPositions);
        if (minExperience) job.minExperience = Number(minExperience);

        await job.save();

        res.status(200).json({ success: true, message: "Job updated successfully.", job });

    } catch (error) {
        console.error("Error updating job:", error?.message);
        res.status(500).json({ success: false, message: "Internal server error.", error: error?.message });
    }
};


