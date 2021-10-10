const StudentModel = require("../models/student")
const SubjectModel = require("../models/subjects")
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
const moment = require('moment')

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


router.get(`/students`, async (req, res) =>{
    StudentModel.find({}).sort({_id: -1}).limit(1).then((item) => {
        res.status(200).send(item)
       })
    
 
   
   })
 
router.get("/student/:id", async (req, res) =>{
    const subject = await Student.findById(req.params.id)
      if(!subject) {
          res.status(500).json({success: false})
      } 
      res.send(subject);
 
  })
  

router.post('/subject',async (req, res) =>{
    
    const subjectDb = new Subject({

        subject:req.body.subject,
        lecturer:req.body.lecturer,
        subjectCredit:req.body.subjectCredit,
        userId:req.body.userId
          
      });
 
    Student.findOneAndUpdate(
        { _id: req.body.userId },
        {$push: {"subjects": {subject: req.body.subject, lecturer:req.body.lecturer,subjectCredit:req.body.subjectCredit,userId:req.body.userId}}},
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

module.exports = router   