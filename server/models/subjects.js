const mongoose = require('mongoose');

const SubjectSchema = mongoose.Schema({
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
    userId:{ 
        type:String,
      
    }
     
});

const Subject = mongoose.model("Subjects",SubjectSchema);
module.exports = Subject;