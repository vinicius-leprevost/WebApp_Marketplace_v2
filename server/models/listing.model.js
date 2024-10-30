import { cond } from "lodash";
import mongoose from "mongoose";

const conditionEnum = {
    NEW: "New",
    USED: "Used"
};

const statusEnum = {
    ACTIVE: "Active",
    PENDING: "Pending",
    SOLD: "Sold"
};

const ListingSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: "Name is required",
    },
    description: {
        type: String,
        trim: true,
        required: "Description is required",
    },
    price: {
        type: Number,
        required: "Price is required",
    },
    // didnt include subcategory in this model because we should be able to derive that from the category model
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: "Category is required",
    },
    images: {
        type: [String],
    },
    location: {
        address: {
            type: String,
            required: "Address is required",
        },
        city: {
            type: String,
            required: "City is required",
        },
        province: {
            type: String,
            required: "Province is required",
        },
        postalCode: {
            type: String,
            required: "Postal code is required",
        },
    },
    condition: {
        type: String,
        enum: Object.values(conditionEnum),
        required: "Condition is required",
    },
    status: {
        type: String,
        enum: Object.values(statusEnum),
        required: "Status is required",
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: "User is required",
    },
    created: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model("Listing", ListingSchema);  