import express from "express";
import { userModel } from "../../db-utils/model";

const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
  const userData = req.body;

  // Check if the user already exists
  const userObj = await userModel.findOne({ email: userData.email });

  if (userObj) {
    res.status(400).send({ msg: "User already exists" });
  } else {
    const id = Date.now().toString();
    bcrypt.hash(userData.password,10,async function(err,hash){
        if(err){
            res.status(500).send({msg:"Please enter a proper password"});
        }else{
            const user=await new user({
                ...userObj,
                password:hash,
                id
            })
        }
    })
 
    await newUser.save();
    res.send({msg:"User saved successfully"})
  }
})