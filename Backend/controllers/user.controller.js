import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import convertFileToDataUri from "../utils/dataURI.js";
import cloudinary from "../utils/cloudinary.js";
export const register = async (req, res) => {
    try {
        const { fullName, email, mobileNumber, password, userRole } = req.body;
    
        // Check for missing fields
        if (!fullName || !email || !mobileNumber || !password || !userRole) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const file = req.file
        const fileURI = convertFileToDataUri(file)

        const cloudinaryResponse = await cloudinary.uploader.upload(fileURI.content, {
            resource_type: "auto"
        });
        

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email."
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            fullName,
            email,
            mobileNumber,
            password: hashedPassword,
            userRole,
            profileDetails:{
               profileImageUrl: cloudinaryResponse.secure_url
            }
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                mobileNumber: newUser.mobileNumber,
                userRole: newUser.userRole
            }
        });

    } catch (error) {
        console.error("Registration error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password, userRole } = req.body;

        // Check for missing fields
        if (!email || !password || !userRole) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password."
            });
        }

        // Check password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password."
            });
        }

        // Check role
        if (user.userRole !== userRole) {
            return res.status(400).json({
                success: false,
                message: "Account does not exist with the selected role."
            });
        }

        // Create JWT token
        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Prepare response user object
        const responseUser = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            mobileNumber: user.mobileNumber,
            userRole: user.userRole,
            profileDetails: user.profileDetails
        };

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                httpOnly: true,
                sameSite: "strict"
            })
            .json({
                success: true,
                message: `Welcome back ${user.fullName}`,
                user: responseUser
            });

    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

export const logout = async (req, res) => {
    try {
        // Clear the cookie named "token"
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully."
        });
    } catch (error) {
        console.error("Logout error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fullName, email, mobileNumber, bio, skills } = req.body;
        const file = req.file;

        // TODO: Cloudinary implementation for uploading file 
        const fileURI = convertFileToDataUri(file)


        const cloudinaryResponse = await cloudinary.uploader.upload(fileURI.content, {
            resource_type: "auto"
        });

        

        // Convert comma-separated skills string to an array
        const skillsArray = typeof skills === "string"
            ? skills.split(",").map(skill => skill.trim())
            : skills;

        const userId = req.userId; // Comes from isAuthenticated middleware

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Update user details if provided
        if (fullName) user.fullName = fullName;
        if (email) user.email = email;
        if (mobileNumber) user.mobileNumber = mobileNumber;

        // Ensure profileDetails object exists
        if (!user.profileDetails) user.profileDetails = {};

        if (bio) user.profileDetails.bio = bio;
        if (skills) user.profileDetails.skills = skillsArray;

        if (cloudinaryResponse) {
            user.profileDetails.resumeUrl = cloudinaryResponse.secure_url

            user.profileDetails.resumeFilename = file.originalname
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user: {
                fullName: user.fullName,
                email: user.email,
                mobileNumber: user.mobileNumber,
                profileDetails: user.profileDetails
            }
        });

    } catch (error) {
        console.error("Update profile error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};