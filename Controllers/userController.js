import user from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Blog from "../Models/blogModel.js";


export const signup = async (req, res) => {
    try {
    const { username, email, password, confirm_password} = req.body;
    console.log(req.body);
   
     // Check if passwords match
    if (password !== confirm_password) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    
    
    // Check if the user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
    }
    console.log(existingUser);
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    
    // Create a new user
    const newUser = new user({
        username,
        email,
        password: hashedPassword,
});
    
    
    // Save the user to the database
    await newUser.save();
    
    res.redirect('/user/home');

    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};


 export const login = async (req, res) => {
     const { email, password } = req.body;

     try {
        // Check if the user exists
        const userdata = await user.findOne({ email });
        if (!userdata) {
            return res.status(404).json({ message: "User not found" });
        }
        
        
        console.log(userdata);
        
        console.log(" Password:", password);
        console.log("Password DB:", userdata.password);

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, userdata.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        
        console.log(user._id);
        
        const token = jwt.sign(
            { id: userdata._id, role: userdata.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        
        console.log(token);
        
         // Respond with the token and user details (excluding password)
         res.cookie("authToken",token);
         console.log('worked');
        
        // res.cookies(token);
        res.redirect('/user/home');
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ message: "An error occurred during login", error });
    }
};


export const renderSignup =  (req,res) =>{
    res.render('signup')
    }

export const renderHome =  async (req,res) =>{
    const blogData = await Blog.find();
    res.render('home',{blogData})
}

export const renderLogin =  (req,res) =>{
    res.render('login')
}

export const renderuserProfile =(req,res)=>{
    const userId = req.user
    console.log(userId);
     res.render('profile');
}




