const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');


exports.signUp = async (req, res) => {
    const { userName, password } = req.body;
    try {
      
      if (!userName || !password) {
        return res
          .status(400)
          .json({ message: "Please provide username and password" });
      }
      
      const user = await User.findOne({ userName });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
  
      
  
      
      
      const newUser = new User({ userName, password: hashedPassword,  });
      
      await newUser.save();
      return res
        .status(201)
        .json({ message: "User created successfully", data: newUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  exports.login = async (req, res) => {
    const { userName, password } = req.body;
    try {
      
      if (!userName && !password) {
        return res
          .status(400)
          .json({ message: "Please provide username and password" });
      }
      
      const user = await User.findOne({ userName: userName });
      if (!user) {
        return res.status(401).json({ message: "Invalid Username" });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid Password" });
      }
      
      const payload = {
        id: user._id, 
        userName: user.userName,
        role: user.role
      }
      
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "4d",
      });
      return res.status(200).json({ message: "Logged in successfully", token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  