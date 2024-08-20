import express from "express";
import { userModel } from "../../db-utils/model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { mailOptions, transporter } from "./mail-utils.js";
// import { JsonWebTokenError } from "jsonwebtoken";

const registerRouter = express.Router();


registerRouter.post("/", async (req, res) => {
  const userData = req.body;
  console.log(userData)
  // Check if the user already exists
  const userObj = await userModel.findOne({ email: userData.email });
 

  if (userObj) {
    res.status(400).send({ msg: "User already exists" });
  } else {
    const id = Date.now().toString();
    bcrypt.hash(userData.password, 10, async(err, hash) =>{
      // Store hash in your password DB.
      if(err){
        res.status(500).send({msg:"Please enter a proper password"})
      }
      else{
        const newUser=await new userModel({
          ...userData,
          password:hash,
          id,
          isVerified:false

        });
        var token = jwt.sign({name:userData.name,email:userData.email}, process.env.JWT_SECRET,{expiresIn:"15mins"});
        await newUser.save(); // validates and inserts the record
        await transporter.sendMail({
          ...mailOptions,
          to: userData.email, // "to" from mail options will be overriden
          subject: "Welcome to the Application, Verify Account",
          text:  `To Continue, Please verify your email address ${process.env.FE_URL}/verify-account?token=${token}`,
        });
        res.send({msg:"User saved successfully"})
      }
  });

    
  }
})
export default registerRouter