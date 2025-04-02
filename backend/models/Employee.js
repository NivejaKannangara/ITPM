import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
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
        verified: { 
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema); 
export default Employee;