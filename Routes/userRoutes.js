import express from "express";
import { signup,login, renderSignup,renderLogin, renderHome, renderuserProfile} from "../Controllers/userController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Define the signup route ,login route
router.post('/signup', signup);
router.post('/login', login);
router.get('/signup',renderSignup);
router.get('/login',renderLogin)
router.get('/home',authenticateToken,renderHome);
router.get('/profile',authenticateToken,renderuserProfile);

export default router;