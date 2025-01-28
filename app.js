import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { connectDB } from './Config/db.js';
import cookieParser from "cookie-parser";
import router from "./Routes/userRoutes.js";
import blogRouter from "./Routes/blogRoutes.js";



dotenv.config();

const port = process.env.PORT || 3002
const app = express();


// app.set('views', path.join(__dirname,'userView'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/user',router);
app.use('/blog',blogRouter);


app.set('view engine','ejs');
// app.use(express.static(path.join(__dirname, 'public')));



connectDB();

app.listen(port,()=>{
    console.log(`port running on ${port}`);  
})