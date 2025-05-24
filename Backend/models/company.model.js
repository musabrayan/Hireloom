import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        unique: true
    },
    companyDescription: {
        type: String
    },
    websiteUrl: {
        type: String
    },
    headquarters: {
        type: String
    },
    logoUrl: {
        type: String 
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export const Company = mongoose.model("Company", companySchema);
