import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true
    },
    spend: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30,
    },
    spent: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['food', 'transport', 'bills', 'shopping', 'other'],
        default: 'food'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Transaction", transactionSchema);