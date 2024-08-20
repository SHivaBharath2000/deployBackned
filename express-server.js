import express from 'express';
import cors from "cors";
import jwt from 'jsonwebtoken';
//import teacherRouter from './Routing/teachers.js';
import teacherRouter from './Routing/teacherRouter.js';
//import studentRouter from './Routing/students/students.js';
import registerRouter from './Routing/auth/register.js';
import studentDBRouter from './Routing/studentsRouter.js';
import connectToDb from './db-utils/mongo.connection.js';
import mongooseConnect from './db-utils/mongoose-connection.js';
import todosRouter from './Routing/todo.js';
import loginRouter from './Routing/auth/login.js';
import verifyUserRouter from './Routing/auth/verifyUser.js';
import forgotRouter from './Routing/auth/forgot.js';
import forgotPasswordRouter from './Routing/auth/forgotpassword.js';



const server=express();
await connectToDb()
await mongooseConnect()
server.use(express.json()); 
server.use(cors());
server.get("/",(req,res)=>{
    res.send("<h1>Welcome</h1>");
})
server.post("/",(req,res)=>{
    const {body}=req
    console.log("Request Body",body)
    res.send({message:"post method is called"})
});
server.put("/",(req,res)=>{
    const {body}=req
    console.log("Request Body",body)
    res.send({message:"put method is called"})
});
server.delete("/",(req,res)=>{
    const {body}=req
    console.log("Request Body",body)
    res.send({message:"delete  method is called"})
});
//This custom middleware for to check the which api is triggered or used
const customMiddleware=(req,res,next)=>{
    console.log(req);
    console.log(new Date().toString(),
    "Handling request for",
    req.method,
    req.originalUrl
);
next()
}
//This auth api for to get the token from the front end it is act as middle ware
const authApi=(req,res,next)=>{
    // console.log("Token from FE",req.headers["authorization"])
    try{
        const token=req.headers['authorization']
        var decoded=jwt.verify(token,process.env.JWT_SECRET||"");
        console.log(decoded);
        next();

    }catch(err){
        res.status(403).send({msg:"Unauthorized"})
    }
}
server.use(customMiddleware)
server.use('/teachers',authApi,teacherRouter);
server.use('/students',customMiddleware,studentDBRouter);
server.use('/forgot',forgotRouter) 
server.use('/forgotpassword',forgotPasswordRouter) 
server.use('/verify-user',verifyUserRouter)
server.use('/todos',todosRouter);
server.use('/register',registerRouter);
server.use('/login',loginRouter)

const port=8000
server.listen(port,()=>{
    console.log("server listening on port"+port);

})