const StudentSchema = require("../models/student");
const generateToken = require("../utils/generateToken.js");
const SubjectSchema = require("../models/subjects")
const moment = require('moment')

const authUser = async (req, res) => {
    const { email, password } = req.body;
 
    const user = await StudentSchema.findOne({ email });

    if (user && (await user.matchPassword(password))) {
     res.json({
      _id: user._id,
      email: user.email,
      pic: user.pic,
      birth: moment(user.birth).format('MMM Do, YYYY'),
      username: user.username,
      token: generateToken(user._id),
      subjects:user.subjects,
    });
    } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
    }
    
 }

  const registerUser = async (req, res) => {
    const {username, email, password,pic,birth} = req.body;
    const subjects = []
    const userExists = await StudentSchema.findOne({ email });
    if (userExists) {
      res.status(404);
      throw new Error("User already exists");
    }
    const user = await StudentSchema.create({
      username,
      email,
      password,
      pic,
      birth,
      subjects
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        pic: user.pic,
        birth: moment(user.birth).format('MMM Do, YYYY'),
        token: generateToken(user._id),
        subjects:user.subjects,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  };
  module.exports = { authUser, registerUser };