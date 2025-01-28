import express from "express";
import { createBlog, listBlogs ,rendermyBlog} from "../Controllers/blogController.js"; 
import { authenticateToken } from "../middleware/auth.js";

const blogRouter = express.Router();

// Route for creating a new blog
blogRouter.post("/create",authenticateToken, createBlog);
blogRouter.get('/getallblogs',authenticateToken,listBlogs);
blogRouter.get('/createmyBlog',authenticateToken,rendermyBlog);

export default blogRouter;
