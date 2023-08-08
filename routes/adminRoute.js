const express = require('express')
const adminRoute = express();

const session = require('express-session')
const config = require("../config/config")
adminRoute.use(session({secret:config.sessionSecret,saveUninitialized:true,resave:false}))


// const bodyParser = require('body-parser')
adminRoute.use(express.json())
adminRoute.use(express.urlencoded({extended:true}))

adminRoute.set('view engine','ejs')
adminRoute.set('views','./views/admin')

const auth = require('../middleware/adminAuth')


const adminController = require('../controllers/adminController');


adminRoute.get('/',auth.isLogout,adminController.loadLogin)


adminRoute.post('/',adminController.verifyLogin)

adminRoute.get('/home',auth.isLogin,adminController.loadDashboard)

adminRoute.get('/logout',auth.isLogin,adminController.logout)

adminRoute.get('/dashboard',auth.isLogin,adminController.adminDashboard)

adminRoute.get('/newUser',auth.isLogin,adminController.newUserLoad)
adminRoute.post('/newUser',adminController.addUser)

adminRoute.get('/edit-user',auth.isLogin,adminController.editUserLoad)
adminRoute.post('/edit-user',adminController.updateUsers)

adminRoute.get('/delete-user',auth.isLogin,adminController.deleteUser)





adminRoute.get('*',function(req,res){

  res.redirect('/admin')

})

module.exports = adminRoute;