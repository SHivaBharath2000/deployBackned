<<<<<<< HEAD
import express from 'express';
const teacherRouter=express.Router();

import { teachers,students } from './local-variable.js';

teacherRouter.get("/",(req,res)=>{
    res.send(teachers)
})
teacherRouter.get("/get-students/:teacherId",(res,req)=>{
    const {   teacherId} =req.params;
    const studentData=students.filter((stu)=>stu.teacherId===teacherId)
    if(teacherId){
        res.send({students:studentData});
    }else{
        res.send(teachers);
    }
})
teacherRouter.post("/",(req,res)=>{
    const {body}=req;
    teachers.push({
        id:Date.now().toString(),
        ...body,
    })
    res.send({msg:"Teacher created successfully"})

})
teacherRouter.get("/",(res,req)=>{
    const{studentId}=req.query;
    if(studentId){
        const teachersData=teachers.filter((t)=>t.students.includes(studentId))
        res.send(teachersData);
    }else{
        res.send(teachers)
    }
})
teacherRouter.put("/:teacherId",(req,res)=>{
    const {teacherId}=req.params;
    const {body}=req;
    const index=teachers.findIndex((t)=>t.id===teacherId)
    teachers[index]={
        ...body,
        id:teacherId
      
    }

  
    res.send({msg:"Teacher updated  successfully"})

})
teacherRouter.delete("/:teacherId",(req,res)=>{
    const {teacherId}=req.params;
    teachers=teachers.filter((teacher)=>teacher.id!==teacherId)
   
    res.send({msg:"Teacher deleted  successfully"})

})

=======
import express from 'express';
const teacherRouter=express.Router();

import { teachers,students } from './local-variable.js';

teacherRouter.get("/",(req,res)=>{
    res.send(teachers)
})
teacherRouter.get("/get-students/:teacherId",(res,req)=>{
    const {   teacherId} =req.params;
    const studentData=students.filter((stu)=>stu.teacherId===teacherId)
    if(teacherId){
        res.send({students:studentData});
    }else{
        res.send(teachers);
    }
})
teacherRouter.post("/",(req,res)=>{
    const {body}=req;
    teachers.push({
        id:Date.now().toString(),
        ...body,
    })
    res.send({msg:"Teacher created successfully"})

})
teacherRouter.get("/",(res,req)=>{
    const{studentId}=req.query;
    if(studentId){
        const teachersData=teachers.filter((t)=>t.students.includes(studentId))
        res.send(teachersData);
    }else{
        res.send(teachers)
    }
})
teacherRouter.put("/:teacherId",(req,res)=>{
    const {teacherId}=req.params;
    const {body}=req;
    const index=teachers.findIndex((t)=>t.id===teacherId)
    teachers[index]={
        ...body,
        id:teacherId
      
    }

  
    res.send({msg:"Teacher updated  successfully"})

})
teacherRouter.delete("/:teacherId",(req,res)=>{
    const {teacherId}=req.params;
    teachers=teachers.filter((teacher)=>teacher.id!==teacherId)
   
    res.send({msg:"Teacher deleted  successfully"})

})

>>>>>>> origin/main
export default teacherRouter;