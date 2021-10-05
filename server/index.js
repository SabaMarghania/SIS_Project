
const mongoose = require('mongoose')
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//conecction
const cors = require('cors')

require('dotenv').config();
app.use(cors())
 

mongoose.connect("mongodb+srv://userSIS:test123@cluster0.puvgu.mongodb.net/MyDataBase?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const userRoutes = require("./routes/route");

app.use("/",userRoutes);


// app.use(express.static("public"));
// app.get('*',function(req,res){
//     res.sendFile(path.join(__dirname + '/public/index.html'))
// })

app.listen(3001,()=>{
    console.log(`server is working on 3001 port`)
})