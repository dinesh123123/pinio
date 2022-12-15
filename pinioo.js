
// import dependancies in pinioo.js fiel
const express=require("express");
const pinioo=express();
const multer = require("multer");
const ejs =require('ejs');
const path = require('path');
const fs = require("file-system");
const bodyParser = require("body-parser");
const user_routes=require("./routes/user_routes");
const admin_routes=require("./routes/admin_routes");




// middlewere setup
pinioo.set("view engine","ejs");
pinioo.set("views", path.join(__dirname, "views"));
pinioo.use('/uploads', express.static('uploads'));
const filePath = path.join(__dirname, '/uploads');
pinioo.set(path.join(__dirname, '/uploads'));
pinioo.engine('html', require('ejs').renderFile);
pinioo.use(express.static(path.join(__dirname, 'public')));


//create middlewere
pinioo.use(express.json());
//body parser using
pinioo.use(bodyParser.urlencoded({ extended:false }));
pinioo.use(bodyParser.json());



// create storage
const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    },

});



const upload = multer({
    storage: storage,
    fileFilter: function(req,file,callback){
        if(
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
    ){
        callback(null,true)
    }else{
        console.log('only  png , jpg & jpeg file supported')
        callback(null,false)
    }

   },
   limits:{

    filesize:1000000000 //1000000 bytes=1MB
   }
});

//setup routes
pinioo.use("/api",user_routes);
pinioo.use("/",admin_routes);



//error handler
pinioo.use((err,req,res,next)=>{res.status(404).json({
        error:'bad request'})
 });


module.exports =pinioo;