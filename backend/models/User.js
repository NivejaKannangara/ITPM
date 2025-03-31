import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            validate: {
                validator: function (v) {
                    return /\S+@\S+\.\S+/.test(v);
                },
                message: (props) => `${props.value} is not a valid email!`,
            },
        },
        password: {
            type: String,
            required: true
        },
        preferences: {
            cheeseLover: {
                type: Boolean,
                default: false
            },
            cuisine: {
                type: String,
                enum: ["Thai", "Chinese", "Italian", "Indian"],
                required: true // NEW CHANGE: Enforced required field
            },
            spicyLevel: {
                type: String,
                enum: ["Mild", "Medium", "Spicy"],
                required: true // NEW CHANGE: Enforced required field
            }
        },
        cartData: {
            type: Object,
            default: {}
        },
        verified: { 
            type: Boolean,
            default: true
        }
    },
    { minimize: false, timestamps: true }
);

// NEW CHANGE: Simplified model export (no duplicate declaration)
const User = mongoose.model("User", userSchema); 
export default User;