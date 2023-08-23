const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/user_management_system");
const express = require("express");


const app = express();

//for user router
const user_route = require('./routes/userRoute')
app.use('/', user_route);


//for admin router
const admin_route = require('./routes/adminRoute')
app.use('/admin', admin_route);


//server
app.listen(8000, function () {
    console.log("Server is running");
})