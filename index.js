const mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/user_management")

const express=require("express")
const app=express()
//for nocache
const nocache = require('nocache')
app.use(nocache())
app.use((req, res, next) => {
  res.set('Cache-control', `no-store,no-cache,must-revalidate`)
  next()
})



//for static files

app.use(express.static(__dirname + '/public'))

//for user route
const userRoute = require('./routes/userRoute')
app.use('/',userRoute)

//for admin route
const adminRoute = require('./routes/adminRoute')
app.use('/admin',adminRoute)

app.listen(3000,()=>{
  console.log("Server running on http://localhost:3000");
})