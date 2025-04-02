import Employee from "../models/Employee.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import "dotenv/config.js";

export const registerEmployee = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email." });
        }

        const existingEmployee = await Employee.findOne({ email });

        if (existingEmployee) {
            return res.status(400).json({ message: "Employee already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const employee = await Employee.create({
            email,
            password: hashedPassword,
            verified: true
        });
        
        const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

        return res.status(201).json({ 
            message: "Registration successful",
            token,
            employee: {
                _id: employee._id,
                email: employee.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || "Server error during registration" });
    }
};

export const loginEmployee = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const employee = await Employee.findOne({ email });

        if (!employee) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (!employee.password) {
            return res.status(500).json({ message: "Employee password not found" });
        }

        const isMatch = await bcrypt.compare(password, employee.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = generateToken(employee._id);

        res.json({
            _id: employee._id,
            email: employee.email,
            token
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error during login" });
    }
};

export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({}, "email"); 
        res.status(200).json(employees);
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ message: "Server error fetching employees" });
    }
};

export const deleteEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        await Employee.findByIdAndDelete(id);
        res.status(200).json({ message: "Employee deleted successfully" });

    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ message: "Server error deleting employee" });
    }
};

export const getEmployeeById = async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({ message: "Server error fetching employee" });
    }
};

const generateToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};