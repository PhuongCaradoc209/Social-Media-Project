import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    // 
    const token = req.headers["Authorization"]?.split(" ")[1]; // Bearer <token>

    if (!token) {
        return res.status(403).json({ error: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded token to the request object
        next(); // Call the next middleware or route handler
    } catch (error) {
        res.status(401).json({ error: "Invalid or expired token" });
    }
}
    