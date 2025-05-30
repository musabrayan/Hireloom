import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    userRole: {
        type: String,
        enum: ['student', 'recruiter'],
        required: true
    },
    profileDetails: {
        bio: {
            type: String
        },
        skills: [{ type: String }],
        resumeUrl: { type: String },
        resumeFilename: { type: String },
        currentCompany: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        profileImageUrl: {
            type: String,
            default: ""
        }
    }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
