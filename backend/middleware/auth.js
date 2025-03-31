import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    let token;

    // NEW CHANGE: Added check for 'Authorization' header existence
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // NEW CHANGE: Verify token with error handling
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = { id: decoded.id }; // Attach user ID to request
            next();

        } catch (error) {
            console.error("JWT Error:", error.message);
            // NEW CHANGE: Specific error responses
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ 
                    success: false, 
                    message: "Session expired. Please log in again." 
                });
            }
            return res.status(401).json({ 
                success: false, 
                message: "Not authorized. Invalid token." 
            });
        }
    } else {
        // NEW CHANGE: Clearer error for missing token
        return res.status(401).json({ 
            success: false, 
            message: "Not authorized. No token provided." 
        });
    }
};

export default authMiddleware;