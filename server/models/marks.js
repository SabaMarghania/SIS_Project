const mongoose = require('mongoose')
const { Schema } = mongoose


const MarkSchema = new Schema({
    // student: {
    //     type: String,

    // },
    // subjectId: {
    //     type: String,
    // },
    activity: {
        type: Number,
        default: 0
    },
    quiz: {
        type: Number,
        default: 0
    },
    midterm: {
        type: Number,
        default: 0
    },
    final: {
        type: Number,
    },
    totalMark:{
        type: Number,

    },
    userID:{
        type:String,
    }
})


 const Marks = mongoose.model('Mark', MarkSchema)
 module.exports = Marks