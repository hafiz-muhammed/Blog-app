
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticateToken = (req, res, next) => {
    // Fetch token from cookies or Authorization header
    const token = req.cookies.authToken || req.headers["authorization"]?.split(" ")[1];

    // Log token for debugging (ensure this is removed in production!)
    console.log("Token received:", token);

    // Redirect if no token is provided
    if (!token) {
        console.log("No token provided. Redirecting to login.");
        return res.redirect("/user/login");
    }

    try {
        // Verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Verified token payload:", verified);

        // Attach the user details to the request
        req.user = verified;

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        console.error("Invalid or expired token:", err.message);
        return res.redirect("/user/login");
    }
};
