// import dependancies in the  router files
const express=require("express");
const router=express();
const bodyParser = require("body-parser");
const userControllers=require("../controllers/user_controllers");
const multer = require("multer");
const ejs =require('ejs');
const path = require('path');
const fs = require("file-system");



router.use('/uploads', express.static('uploads'));
const filePath = path.join(__dirname, '/uploads');
router.set(path.join(__dirname, '/uploads'));
router.set("view engine","ejs");
router.set("views", path.join(__dirname, "views"));
router.engine('html', require('ejs').renderFile);
router.use(express.static(path.join(__dirname, 'public')));



//create middlewere
router.use(express.json());
//body parser using
router.use(bodyParser.urlencoded({ extended:false }));
router.use(bodyParser.json());

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



//import user controllers files here
router.post("/user/signup",userControllers.User_Signup);
router.post("/user/verify/otp",userControllers.verifyOtp);
router.post("/user/logout",userControllers.UserLogout);
router.post("/user/resend/otp",userControllers.UserResendOtp);
router.get("/user/privacy/policy",userControllers.PrivacyPolicyList);
router.get("/user/term/condiction",userControllers.TermAndCondictionList);
router.post("/user/google/login",upload.single('image'),userControllers.GooleLogin);
router.post("/user/details/update",userControllers.UserDetailsUpdate);
router.post("/user/profile/update",upload.single('image'),userControllers.UserProfileUpdate);
router.post("/user/contact/us",userControllers.UserContactUs);
router.get("/user/notification",userControllers.NotificationApi);
router.get("/user/category/list",userControllers.CategoryApi);
router.get("/user/sub/category/list",userControllers.SubCategoryApi);
router.post("/user/verify/account",userControllers.VerifyAccounts);
router.post("/user/manage/payments",userControllers.ManageAccount);
router.post("/user/add/amount",userControllers.AddAmount);
router.get("/user/banner/list",userControllers.BannerList);
router.get("/user/question/list",userControllers.QuestionList);

module.exports=router;