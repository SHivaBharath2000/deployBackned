import express from "express";
import { userModel } from "../../db-utils/model.js";

const redirectRouter = express.Router();

redirectRouter.post("/", async (req, res) => {
    const userData = req.body;
    console.log(userData)
    const userObj = await userModel.findOne({ 
        urlid: userData.urlid
    });
    console.log(userObj)

    try {
        if (userObj) {
            res.status(200).send({
                longURL: userObj.longURL,
                msg: "URL sent successfully",
               
            });
        } else {
            res.status(500).send({ msg: "Id not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: "Something went wrong" });
    }
});

export default redirectRouter;
