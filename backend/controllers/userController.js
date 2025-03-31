import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import "dotenv/config.js";

export const registerUser = async (req, res) => {
    const { email, password, preferences } = req.body;

    try {
        // NEW CHANGE: Added validation for preferences
        if (!preferences || !preferences.cuisine || !preferences.spicyLevel) {
            return res.status(400).json({ message: "All preferences are required." });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email." });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            email,
            password: hashedPassword,
            preferences,
            verified: true
        });
        
        // NEW CHANGE: Ensure token is generated after successful registration
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

        return res.status(201).json({ 
            message: "Registration successful",
            token, // NEW CHANGE: Added token to response
            user: {
                _id: user._id,
                email: user.email,
                preferences: user.preferences
            }
        });

    } catch (error) {
        console.error(error);
        // NEW CHANGE: More specific error message
        res.status(500).json({ message: error.message || "Server error during registration" });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // NEW CHANGE: Added null check for user.password
        if (!user.password) {
            return res.status(500).json({ message: "User password not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user._id);

        res.json({
            _id: user._id,
            email: user.email,
            token,
            preferences: user.preferences // NEW CHANGE: Added preferences to response
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error during login" });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { preferences } = req.body; // Destructure preferences from request body
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { preferences }, // Only update preferences
        { new: true }    // Return the updated user
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ message: "Failed to update user preferences" });
    }
  };

export const getAllUsers = async (req, res) => {
    try {
        // NEW CHANGE: Include preferences in the response
        const users = await User.find({}, "email preferences"); 
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error fetching users" });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Server error deleting user" });
    }
};
export const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error fetching user" });
    }
  };
  
const generateToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};