import express from "express";
import { loginUser, registerUser, getAllUsers, deleteUser, getUserById, updateUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

// NEW CHANGE: Added input validation middleware (optional but recommended)
userRouter.post("/register-user", 
    express.json(), // Ensures JSON payloads are parsed
    registerUser
);

userRouter.post("/login", 
    express.json(), // NEW CHANGE: Added JSON middleware
    loginUser
);

userRouter.get("/users", 
    getAllUsers
);

userRouter.delete("/users/:id", 
    deleteUser
);

userRouter.get("/users/:id", 
    getUserById
  )

  // ADD THIS ROUTE FOR UPDATES
userRouter.put("/users/:id", 
    express.json(),  // Parse JSON body
    updateUser      // Link to controller
  );

// NEW CHANGE: Simplified profile route (removed redundant user ID check)
userRouter.get("/profile", authMiddleware, (req, res) => {
    res.json({ 
        message: `Welcome user ${req.user.id}`,
        userId: req.user.id // NEW CHANGE: Explicitly return user ID
    });
});

export default userRouter;