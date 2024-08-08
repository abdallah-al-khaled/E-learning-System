import { validationResult } from "express-validator";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import Class from "../models/class.model.js";
dotenv.config({ path: path.resolve('C:/Users/fafaf/Desktop/E learning/.env') });

export const login1 = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  if (await user.comparePassword(password)) {
    return res.status(200).json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid username or password" });
  }
};

export const register1 = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ username });
  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  const existingUserByEmail = await User.findOne({ email });
  if (existingUserByEmail) {
    return res.status(400).json({ message: "Email already in use" });
  }
  if (user) {
    return res.status(400).json({ message: "Username already exists" });
  }
  const newUser = new User({ username, password });
  await newUser.save();
  return res.status(201).json({ message: "User created successfully" });
};

export const getUsers = async (req, res) => {
  try {
    // Attempt to retrieve all users from the database
    const users = await User.find();

    // If successful, send the users as a JSON response
    res.json(users);
  } catch (error) {
    // Log the error to the console
    console.error("Error fetching users:", error);

    // Send a 500 Internal Server Error response with an error message
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      name,
      email,
      password,
      role,
    });
    console.log("salt enc");
    

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    console.log("salt enc after");

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    console.log("jwt bef");
    
    const token = jwt.sign({
        id: user.id,
        role: user.role,
      }
      , process.env.JWT_KEY)
    // jwt.sign(
    //   payload,
    //   process.env.JWT_SECRET,
    //   { expiresIn: 360000 },
    //   (err, token) => {
    //     if (err) throw err;
    //     res.json({ token });
    //   }
    // );
    console.log("jwt aft");
    
    return res
      .status(201)
      .json({ message: "User created successfully", user, token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    const token = jwt.sign({
        id: user.id,
        role: user.role,
      }
      , process.env.JWT_KEY)

    return res
      .status(201)
      .json({ message: "Login successfully", user, token:"Bearer "+token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getUserClasses = async (req, res) => {
  try {
    const classes = await Class.find({ students: req.user._id })
    
    if (!classes) {
      return res.status(404).json({ message: 'No classesw found' });
    }
    res.status(200).json(classes);
    // console.log(classes);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getAllUsersInClasses = async (req, res) => {
  try {
    // Fetch all classes with populated student information
    const classes = await Class.find().populate('students', 'name email'); // Populate students field with user data

    if (!classes) {
      return res.status(404).json({ message: 'No classes found' });
    }

    // Format the response data
    const result = classes.map(cls => ({
      classId: cls._id,
      className: cls.name,
      students: cls.students 
    }));

    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const isAdmin = async (req, res, next) => {
  const userId = req.user._id;
  try {
    res.status(200);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}