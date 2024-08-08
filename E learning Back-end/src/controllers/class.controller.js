import Class from "../models/class.model.js";
import { validationResult } from "express-validator";
import User from "../models/user.model.js";
import File from "../models/file.model.js";

export const createClass = async (req, res) => {
  const errors = validationResult(req);
  console.log(req.body);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, description } = req.body;
  try {
    const newClass = new Class({
      name,
      description,
    });

    await newClass.save();
    res.status(201).json(newClass);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getClassById = async (req, res) => {
  const { id } = req.params;

  try {
    const singleClass = await Class.findById(id);
    const files = await File.find({ classId: id });
    // console.log(files);
    
    if (!singleClass) {
      return res.status(404).json({ msg: "Class not found" });
    }    
    res.json({singleClass, files});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const updateClass = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedClass = await Class.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!updatedClass) {
      return res.status(404).json({ msg: "Class not found" });
    }
    res.json(updatedClass);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const deleteClass = async (req, res) => {
  const { id } = req.params;


  try {
    const deletedClass = await Class.findByIdAndDelete(id);
    
    if (!deletedClass) {
      return res.status(404).json({ msg: "Class not found" });
    }
    res.json({ msg: "Class removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const enrollClass = async (req, res) => {
  try {

    const userId = req.user.id;
    const classId = req.params.classId;

    const user = await User.findById(userId);
    const classItem = await Class.findById(classId);
    if (!user || !classItem) {
      return res.status(404).json({ msg: "User or Class not found" });
    }
    const classToEnroll = await Class.findById(classId);
    // Check if the user is already enrolled
    if (classToEnroll.students.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User already enrolled in this class" });
    }
    classToEnroll.students.push(userId);
    await classToEnroll.save();
    res.status(200).json({ message: "Enrollment successful" });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Server error", error });
  }
};

export const getUsersClasses = async (req, res) => {
  try {
    const courseId = req.body.classId;

    const course = await Class.findById(courseId).populate('students').exec();

    res.status(200).json(course.students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

