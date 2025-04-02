import express from "express";
import { 
    loginEmployee, 
    registerEmployee, 
    getAllEmployees, 
    deleteEmployee, 
    getEmployeeById 
} from "../controllers/employeeController.js";
import authMiddleware from "../middleware/auth.js";

const employeeRouter = express.Router();

employeeRouter.post("/register-employee", 
    express.json(),
    registerEmployee
);

employeeRouter.post("/login", 
    express.json(),
    loginEmployee
);

employeeRouter.get("/employees", 
    getAllEmployees
);

employeeRouter.delete("/employees/:id", 
    deleteEmployee
);

employeeRouter.get("/employees/:id", 
    getEmployeeById
);

employeeRouter.get("/profile", authMiddleware, (req, res) => {
    res.json({ 
        message: `Welcome employee ${req.user.id}`,
        userId: req.user.id
    });
});

export default employeeRouter;