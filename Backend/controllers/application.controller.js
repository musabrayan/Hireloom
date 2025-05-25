import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

// Controller to handle job application by a user
export const applyToJob = async (req, res) => {
    try {
        const applicantId = req.userId; // Extract user ID from authenticated request
        const jobId = req.params.id; // Get job ID from route parameter

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

import { Application } from "../models/application.model.js";

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
