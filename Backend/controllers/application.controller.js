import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

// Controller to handle job application by a user
export const applyToJob = async (req, res) => {
    try {
        const applicantId = req.userId; 
        const jobId = req.params.id; 

        if (!jobId) {
            return res.status(400).json({
                success: false,
                message: "Job ID is required",
            });
        }

        // Check if the user has already applied for this job
        const existingApplication = await Application.findOne({
            jobId,
            applicantId,
        });

        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this job",
            });
        }

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        // Create a new application
        const newApplication = await Application.create({
            jobId,
            applicantId,
        });

        // Add application to the job's application list
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            success: true,
            message: "Applied to job successfully",
            applicationId: newApplication._id,
        });

    } catch (error) {
        console.error("Error while applying to job:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


export const getUserAppliedJobs = async (req, res) => {
    try {
        const userId = req.userId;

        const applications = await Application.find({ applicantId: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: "jobId",
                populate: {
                    path: "companyId"
                }
            });

        // Check if applications are found
        if (!applications || applications.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No applications found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Applied jobs fetched successfully.",
            applications
        });

    } catch (error) {
        console.error("Error fetching applied jobs:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message
        });
    }
};


export const getJobApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Find the job and populate applications with applicant details
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicantId"
            }
        });

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Applicants fetched successfully.",
            job
        });

    } catch (error) {
        console.error("Error fetching applicants:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message
        });
    }
};

export const updateApplicationStatus = async (req, res) => {
    try {
        
        const { applicationStatus } = req.body;
        const applicationId = req.params.id;

        // Validate input
        if (!applicationStatus) {
            return res.status(400).json({
                success: false,
                message: "Application status is required"
            });
        }

        // Find application
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        // Update and save
        application.applicationStatus = applicationStatus.toLowerCase();
        await application.save();

        return res.status(200).json({
            success: true,
            message: "Application status updated successfully",
            updatedStatus: application.applicationStatus
        });

    } catch (error) {
        console.error("Status update error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};