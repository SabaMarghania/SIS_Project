const mongoose = require('mongoose');
const bcrypt = require ("bcryptjs");
const Schema = mongoose.Schema;


const StudentSchema = mongoose.Schema({
 
    username:{
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
  
    subjects:[{
        subject: {
            type: String,
        },
        lecturer: {
            type: String,
        },
        subjectCredit:{
            type:Number,
            default:30
        },
        userId:{ type:String }
    }],
    password: {
        type: String,
        required: false,
    },

    pic:{
        type: String,

    },
    lecturer:{
        type:String,
    },
    
});

StudentSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  // will encrypt password everytime its saved
  StudentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
const Student = mongoose.model("Student",StudentSchema,"student");
module.exports = Student;