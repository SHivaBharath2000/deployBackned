import express from 'express'
import { userModel } from "../../db-utils/model.js";
import { mailOptions, transporter } from "./mail-utils.js";
import dotenv from 'dotenv'
dotenv.config();

const URLrouter=express.Router()

URLrouter.post("/",async(req,res)=>{
    const userData = req.body; 
    const userObj = await userModel.findOne({ email: userData.email });
     const shortURL=`${process.env.FE_URL}/${Date.now().toString()}`
     const urlid=Date.now().toString()
    try{
        if(userObj)
            {
            await userModel.updateOne(
                { email: userData.email },
                {
                    $set: {
                        longURL:userData.longURL,
                        urlid: Date.now().toString(),
                        shortURL:`${process.env.FE_URL}/${Date.now().toString()}`
                    }
                }
              );
              await transporter.sendMail({
                ...mailOptions,
                to: userData.email, // "to" from mail options will be overriden
                subject: "Your shortned URL",
                text:`To Continue,Your shortned URL ${process.env.FE_URL}/redirect-url/${urlid}`,
              });
              res.send({ msg: "Url shortner added successfully ", code: 1 ,shortenedURL:shortURL});
            }
            else{
                res.status(403).send({ msg: "user not found", code: -1 });
            }
        }
        catch(err){
            console.log(err)
            res.status(403).send({ msg:err })
        }
    }

)
export default URLrouter