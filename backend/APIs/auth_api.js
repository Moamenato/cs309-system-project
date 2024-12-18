const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../MongoDB Schema/user_schema.js");
const jwt = require("jsonwebtoken");
const {promisify} = require("util");
const router = express.Router();


const createToken =(id)=> jwt.sign({id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRATION_TIME});

// Create a new user
router.post("/", async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({ email, password: hashedPassword, ...rest });
    const user = await newUser.save();
    const token = createToken(user._id);
    user.password = undefined;
    user.createdAt = undefined;
    user.updatedAt = undefined;
    user.__v= undefined;
    res.status(201).json({ message: "User created successfully", user,token });
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error: error.message });
  }
});

// User Login
router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await Users.findOne({ email }).select("-createdAt -updatedAt -__v");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    user.password = undefined;
    const token = createToken(user._id);
    res.status(200).json({ message: "Login successful",user, token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

 const protect = async (req, res, next) => {
    // 1) Get token and check if it exists
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
   
    if (!token) {
        return  res.status(401).json({ message: "You are not logged in! Please log in to get access.", error: error.message });
      
    }
  
    // 2) Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
    // 3) Check if user still exists
    const freshUser = await Users.findById(decoded.id);
    if (!freshUser) {
      return  res.status(401).json({ message: "Error fetching user", error: error.message });
      
    }
    
    req.user = freshUser; // Pass the user to the next middleware
  
    next();
  };

module.exports = {router,protect};