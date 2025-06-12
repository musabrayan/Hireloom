import { Company } from "../models/company.model.js";
import convertFileToDataUri from "../utils/dataURI.js";
import cloudinary from "../utils/cloudinary.js";
// Register a new company
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }

        // Check if company already exists
        let existingCompany = await Company.findOne({ companyName });
        if (existingCompany) {
            return res.status(400).json({
                message: "Company with the same name already exists.",
                success: false
            });
        }

        const newCompany = await Company.create({
            companyName,
            createdBy: req.userId
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company: newCompany,
            success: true
        });

    } catch (error) {
        console.error("Register Company Error:", error.message);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// Get all companies created by the logged-in user
export const getMyCompanies = async (req, res) => {
    try {
        const userId = req.userId;

        const companies = await Company.find({ createdBy: userId });

        return res.status(200).json({
            companies,
            success: true
        });

    } catch (error) {
        console.error("Get My Companies Error:", error.message);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// Get a company by ID
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;

        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            company,
            success: true
        });

    } catch (error) {
        console.error("Get Company By ID Error:", error.message);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// Update a company
export const updateCompany = async (req, res) => {
    try {
        const { companyName, companyDescription, websiteUrl, headquarters } = req.body;
        const file = req.file;
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

         if (req.file) {
            const fileURI = convertFileToDataUri(req.file);
            const cloudinaryResponse = await cloudinary.uploader.upload(fileURI.content);
            company.logoUrl = cloudinaryResponse.secure_url;
        }

        if (company.createdBy.toString() !== req.userId) {
            return res.status(403).json({
                message: "Unauthorized to update this company.",
                success: false
            });
        }

        // Update only provided fields
        if (companyName) company.companyName = companyName;
        if (companyDescription) company.companyDescription = companyDescription;
        if (websiteUrl) company.websiteUrl = websiteUrl;
        if (headquarters) company.headquarters = headquarters;
        

        await company.save();

        return res.status(200).json({
            message: "Company updated successfully.",
            company,
            success: true
        });

    } catch (error) {
        console.error("Update Company Error:", error.message);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};
