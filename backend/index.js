import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js"; // Import connectDB function
import userRouter from "./routes/userRoute.js"; // Adjusted import path for user routes
import employeeRouter from "./routes/employeeRoute.js";


dotenv.config(); // Load .env variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON request bodies

// Connect to MongoDB
connectDB();

// API Endpoints
app.use("/api/users", userRouter); // Mount user routes (for registration, OTP verification, and login)
app.use("/api/employees", employeeRouter);

// Home Route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
