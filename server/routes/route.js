const StudentModel = require("../models/student")
const SubjectModel = require("../models/subjects")
const MarkModel = require("../models/marks")
const express = require ("express");
const router = express.Router();
const { 
  authUser,
  registerUser,
} =require("../controllers/userCtrl");
const Student = require("../models/student");
const Subject = require("../models/subjects");
const authPage = require('../middleware/pageauth')
const parser = require('../middleware/cloudinary.config')
router.post("/register",registerUser);
router.post("/login", authUser)
const moment = require('moment');
const Marks = require("../models/marks");
const mongoose = require('mongoose');


//get all students data
router.get('/getStudents', (req,res)=>{
    StudentModel.find({},(err,result)=>{
        if(err){
            res.status(200).send(err);
        }
  
         res.status(200).send(result);
    })
    
})
router.get('/subjects', (req,res)=>{
    SubjectModel.find({},(err,result)=>{
        if(err){
            res.status(200).send(err);
        }
        
         res.status(200).send(result);
    })
    
})
router.get('/marks', (req,res)=>{
    MarkModel.find({},(err,result)=>{
        if(err){
            res.status(200).send(err);
        }
        
         res.status(200).send(result);
    })
    
})


 
router.get("/student/:id", async (req, res) =>{
    try{
        const student = await Student.findById({_id: req.params.id})
        if( !mongoose.Types.ObjectId.isValid(req.params.id) ) {
            res.send("ERRROR")
        };
    
        res.status(200).send(student);
    }catch(err){
        console.log(err)
    }
    

   
  })

//   studentMarks
router.post('/studentMarks',async (req, res) =>{
    const { ObjectId } = mongoose.Types;
//

      Student.findOneAndUpdate(
        { _id: ObjectId(userID )},
        {$push: {"marks": {activity: req.body.activity,  quiz:req.body.quiz, subjectName:req.body.subjectName, midterm:req.body.midterm,final:req.body.final,totalMark:req.body.totalMark}}},
        {safe: true, upsert: true},
        function(err, model) {
            console.log(err);
            console.log(model)
        }
    );
        res.status(200).send("Marks pushed")


   

})
router.post('/subject',async (req, res) =>{
    console.log(req.body.schedule)
    const subjectDb = new Subject({

        subject:req.body.subject,
        lecturer:req.body.lecturer,
        subjectCredit:req.body.subjectCredit,
        userId:req.body?.userId,
        schedule:req.body.schedule,
      });
      const { ObjectId } = mongoose.Types;
 
    Student.findOneAndUpdate(
        { _id: ObjectId(userId ) },
        {$push: {"subjects": {subject: req.body.subject, lecturer:req.body.lecturer,subjectCredit:req.body.subjectCredit,userId:req.body.userId,schedule:req.body.schedule}}},
        {safe: true, upsert: true},
        function(err, model) {
            console.log(err);
            console.log(model)
        }
    );
    subj = await subjectDb.save();

    if(!subj) 
    return res.status(500).send('The subject cannot be created')

    // console.log(product);

   

})

router.get('/credit', (req,res)=>{
    SubjectModel.find({}).sort({_id: -1}).limit(1).then((item) => {
        res.status(200).send(item)
       })
    
})
router.get('/subject/:id', async(req,res)=>{
    const category = await SubjectModel.findById(req.params.id);

    if(!category) {
        res.status(500).json({message: 'The category with the given ID was not found.'})
    } 
    res.status(200).send(category);
})

router.put('/updatePic/:id',parser.single("file"), (req,res)=>{
    try{
        Student.findById(req.params.id,(err,updatedPic)=>{
            updatedPic.pic = req.body.file;
            updatedPic.save();
    })
    }catch(err){
         console.log(err);
    }
    res.status(200).send("Picture has been updated")
})
router.put('/editProfile/:id', (req,res)=>{
    try{
        Student.findById(req.params.id,(err,updatedProfile)=>{
            updatedProfile.username = req.body.username;
            updatedProfile.email = req.body.email;
            updatedProfile.birth = moment(req.body.birth).format('MMM Do, YYYY');
            updatedProfile.save();
    })
    }catch(err){
         console.log(err);
    }
    res.status(200).send("Picture has been updated")

  })
  router.put('/updateStudentsPic/:id', parser.single("file"), (req,res)=>{
    try{
        Student.findById(req.params.id,(err,updatedPic)=>{
            updatedPic.pic = req.body.file;
            updatedPic.save();
    })
    }catch(err){
         console.log(err);
    }
    res.status(200).send("Picture has been updated")
})
  router.put('/editStudentsProfile/:id', (req,res)=>{
    try{
        Student.findById(req.params.id,(err,updatedProfile)=>{
            updatedProfile.username = req.body.username;
            updatedProfile.email = req.body.email;
            updatedProfile.birth = moment(req.body.birth).format('MMM Do, YYYY');
            updatedProfile.save();
    })
    }catch(err){
         console.log(err);
    }
    res.status(200).send("Picture has been updated")

  })
  router.delete('/deleteUser/:id',async (req,res)=>{
    const id = req.params.id;
    await Student.findByIdAndDelete(id).exec();
    res.status(200).send("User Deleted");
    console.log("Success")
  })
module.exports = router   