import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 4,
        maxlength: 15,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        sparse: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },

    moneySettings: {
        income: { type: Number, default: 0 },
        expenseLimits: {
            food: { type: Number, default: 0 },
            bills: { type: Number, default: 0 },
            others: { type: Number, default: 0 },
        }
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("User", userSchema);