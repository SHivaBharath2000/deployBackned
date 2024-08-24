
import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  id: {
    type: "string",
    required: true,
  },
  name: {
    type: "string",
    required: true,
  },
  course: {
    type: "string",
    required: true,
  },
  batch: {
    type: "string",
    required: true,
  },
  students: {
    type: "array",
    required: true,
    default: [],
  },
});

//Model creation using schema
const teacherModel = new mongoose.model("teacher", teacherSchema, "teachers");
//objectname,schema,collection name value

const userSchema = new mongoose.Schema({
  // id: {
  //   type: "string",
  //   required: true,
  // },
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  role: {
    type: "string",
    required: true,
  },
  isVerified: {
    type: "boolean",
    required: false,
  },
  longURL:{
    type:"string",
    required: false,
  },
  shortURL:{
    type:"string",
    required: false,
  },
  urlid:{
    type:"string",
    required: false,
  },
});

const userModel = new mongoose.model("user", userSchema, "users");
export { teacherModel , userModel};