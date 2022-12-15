// import dependancies in the  router files
const express=require("express");
const router=express();
const PrivacyPolicy=require("../models/privacy_policy_models");
const TermCondition=require("../models/term_condiction_models");
const Notification=require("../models/notification_models");
const Category=require("../models/category_models");
const SubCategory=require("../models/sub_category_models");
const Question=require("../models/question_models");
const BannerAddmin=require("../models/banner_models");
const bodyParser = require("body-parser");
const multer = require("multer");
const ejs =require('ejs');
const path = require('path');
const fs = require("file-system");


/*
router.use('/uploads', express.static('uploads'));
const filePath = path.join(__dirname, '/uploads');
router.set(path.join(__dirname, '/uploads'));
router.set("view engine","ejs");
router.set("views", path.join(__dirname, "views"));
router.engine('html', require('ejs').renderFile);
router.use(express.static(path.join(__dirname, 'public')));
*/


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



// show admin ui
//create index page
router.get("/index",(req,res)=>{
    res.render("index.ejs")
});

//create index page
router.get("/create/question",(req,res)=>{
    res.render("c_question.ejs")
});





//create privacy Policy post api
router.post("/admin/privacy/policy",async(req,res)=>{
    const{title,privacy_policy_text}=req.body;  
        if(privacy_policy_text && title){
                try{
                    
                const user=new PrivacyPolicy({title,privacy_policy_text})
                const result=await user.save()
   return res.status(200).json(/*"/admin/banner/list");*/{result:true,message:"data add sucessfully",data:result})
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:false,message:" get some error",msg:error.message})
}

        }else{
        res.send({result:false,message:"parameter required privacy_policy_text,title "});
    }

    
});




// create term and condiction api
router.post("/admin/term/condiction",async(req,res)=>{
     try{
        const  {term_condiction_Text ,title}=req.body;
        if(term_condiction_Text && title){
        const gameRules =new TermCondiction({
              term_condiction_Text:term_condiction_Text,
              title:title
                            
});
        const term_pollicy = await gameRules.save();
        res.status(200).json({result:true,message:" insert sucessfully",data:term_pollicy});
    }
    else{
    res.status(400).json({result:false,message:"parameter required term_condiction_Text,title"});
}

}catch(error){
    res.status(400).send({result:false,message:"get some error", msg:error.message});
}
    
});



//create notification api
router.post("/admin/notification",upload.single('image'),async(req,res)=>{
    try{
         const notificationData={title,description}=req.body;
         const notification =new Notification({title:title,description:description,image:req.file.filename        
    });
             if(title && description){
            const user_notification = await notification.save();
             res.status(200).json({result:true,message:"user notification insert sucessfully",data:user_notification});
 
  }else{ 
     res.status(400).json({result:false,message:"required parameters title,description,image"})
  }
 }catch(error){
            res.status(500).send({result:false,message:"notification  not send", msg:error.message});
        }
});





// create category api
router.post("/admin/category",upload.single('image'),async(req,res)=>{
    try{
         const {category_name}=req.body;
         const user_profile= await Category.findOne({category_name:category_name});
          if(user_profile){
        if(req.file){
            var profileRecord={
        category_name:category_name,
        image:req.file.filename
    }

   }else{
var profileRecord={
      category_name:category_name
    }
   }
 const updateUser_data= await Category.findOneAndUpdate({category_name:category_name},(profileRecord),      
{new:true}); 
   res.status(200).redirect("/admin/category/list");/*json({result:true, message: "data updated successfully.",data:updateUser_data})*/

}else{
const category=new Category({category_name:category_name,image:req.file.filename});
             if(category_name){
            const result = await category.save();
             res.status(200).redirect("/admin/category/list");//json({result:true,message:"add sucessfully",data:result});
 
  }else{ 
     res.status(400).json({result:false,message:"required parameters category_name,image"})
  }
 }
}catch(error){
            res.status(500).send({result:false,message:"get some error", msg:error.message});
        }
});





// category list api
router.get("/admin/category/list",async(req,res)=>{
try{
    const data = await Category.find();
    if(data != null){
        res.status(200).render("game_category.ejs",{result:"true",message:"all data lists are",data:data})
    }else{
        res.status(400).json({result:"false",message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
       res.status(402).send({result:"false",message:"get some error",msg:error.message})
  }     

});




// create category delete api
router.get("/admin/category/delete/:_id",async(req,res)=>{
try{       
     const id=req.params._id;  
    const banner =await Category.findByIdAndDelete(id);       
    if(banner.length==0){
        res.status(404).render('game_category',{result:false,message:"Record not found"});
    }else{
     res.status(201).redirect("/admin/category/list");/*({ result: true, message: "data deleted successful", data: banner}) */
    }
 
}
    catch(error){

             res.status(400).json({result:false,message:"data does not deleted",msg:error.message})
    }
});





// create sub_category Post method
router.post("/admin/sub/category",upload.single('image'),async(req,res)=>{
    try{
         const {sub_category_name,category_name}=req.body;
          const user_profile= await SubCategory.findOne({sub_category_name:sub_category_name});
          if(user_profile){
        if(req.file){
            var profileRecord={
        sub_category_name:sub_category_name,
        category_name:category_name,
        image:req.file.filename
    }

   }else{
var profileRecord={
       sub_category_name:sub_category_name,
        category_name:category_name
    }
   }
 const updateUser_data= await SubCategory.findOneAndUpdate({sub_category_name:sub_category_name},(profileRecord),      
{new:true}); 
   res.status(200).redirect("/admin/subcategory/list");/*json({result:true, message: "data updated successfully.",data:updateUser_data})*/

}else{
         const category=new SubCategory({sub_category_name,category_name,image:req.file.filename});
             if(sub_category_name && category_name){
            const result = await category.save();
             res.status(200).redirect("/admin/subcategory/list");/*json({result:true,message:"insert sucessfully",data:result});*/
 
  }else{ 
     res.status(400).json({result:false,message:"required parameters sub_category_name, category_name,image"})
  }
}
 }catch(error){
            res.status(500).send({result:false,message:"get some error", msg:error.message});
        }
});




// subcategory list api
router.get("/admin/subcategory/list",async(req,res)=>{
try{
    const data = await SubCategory.find();
    if(data != null){
        res.status(200).render("game_subcategory.ejs",{result:"true",message:"all data lists are",data:data})
    }else{
        res.status(400).json({result:"false",message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
       res.status(402).send({result:"false",message:"get some error",msg:error.message})
  }     

});



// create subcategory delete api
router.get("/admin/subcategory/delete/:_id",async(req,res)=>{
try{       
     const id=req.params._id;  
    const banner =await SubCategory.findByIdAndDelete(id);       
    if(banner.length==0){
        res.status(404).render('game_subcategory',{result:false,message:"Record not found"});
    }else{
     res.status(201).redirect("/admin/subcategory/list");/*({ result: true, message: "data deleted successful", data: banner}) */
    }
 
}
    catch(error){

             res.status(400).json({result:false,message:"data does not deleted",msg:error.message})
    }
});




// create question api
router.post("/admin/question",upload.single('image'),async(req,res)=>{
    try{
         const {sub_category_name,categoryId,
                subcategoryId,category_name,
                 question,answer,optiona,optionb,
                  optionc,optiond,exp_date,yes_prize,no_prize,
                  event_prize,volume_prize,description,types
                   }=req.body;

const questions=new Question({sub_category_name,categoryId,
                category_name,subcategoryId,
                 question,answer,optiona,optionb,
                  optionc,optiond,exp_date,yes_prize,no_prize,
                  event_prize,volume_prize,description,types,image:req.file.filename});
              
              
             if(/*sub_category_name && categoryId && */
                 category_name && /*subcategoryId &&*/ 
                  question && answer && optiona && optionb
                  /* exp_date && yes_prize && no_prize && 
                   event_prize && description*/){
            const result = await questions.save();
             res.status(200).json({result:true,message:"insert sucessfully",data:result});
 
  }else{ 
     res.status(400).json({result:false,message:
                 `required parameters sub_category_name,categoryId,
                  category_name,subcategoryId,
                  question,answer,optiona,
                  exp_date,yes_prize,no_prize,
                  event_prize,description,image`})
  }
 }catch(error){
            res.status(500).send({result:false,message:"get some error", msg:error.message});
        }
});




// create questions list admin side
router.get("/admin/question/list",async(req,res)=>{
try{
    const data = await Question.find();
    if(data != null){
        res.status(200).render("question.ejs",{result:"true",message:"all data lists are",data:data})
    }else{
        res.status(400).json({result:"false",message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
       res.status(402).send({result:"false",message:"get some error",msg:error.message})
  }     

});



// create question delete api
router.get("/admin/question/delete/:_id",async(req,res)=>{
try{       
     const id=req.params._id;  
    const banner =await Question.findByIdAndDelete(id);       
    if(banner.length==0){
        res.status(404).render('question',{result:false,message:"Record not found"});
    }else{
     res.status(201).redirect("/admin/question/list");/*({ result: true, message: "data deleted successful", data: banner}) */
    }
 
}
    catch(error){

             res.status(400).json({result:false,message:"data does not deleted",msg:error.message})
    }
});





// Create banner post and update api
router.post("/admin/banner",upload.single('image'),async(req,res)=>{
    const{banner_title,date}=req.body;  
   /* const user_profile= await BannerAddmin.findOne({team_names:team_names});
    if(user_profile){
        if(req.file){
            var profileRecord={
        banner_title:banner_title,
        team_names:team_names,
        date:date,
        image:req.file.filename
    }

   }else{
var profileRecord={
       banner_title:banner_title,
        team_names:team_names,
        date:date, 
    }
   }
 const updateUser_data= await BannerAddmin.findOneAndUpdate({team_names:team_names},(profileRecord),      
{new:true});
     
   res.redirect("/admin/banner/list");/*{result:true, message: "user data updated successfully.",data:updateUser_data})*/
   // }else{*/
        /*if(image){*/
                try{
                    
                const user=new BannerAddmin({banner_title,date,image:req.file.filename})
                const profile_data=await user.save()
   return res.status(200).redirect("/admin/banner/list");/*{result:true,message:"Your are upload sucessfully",data:profile_data})*/
    }catch(error){
        console.log(error.message)
    res.status(200).json({result:false,message:" team_names is not valid",msg:error.message})
}

       /* }else{
        res.send({result:false,message:"parameter required image"});
    }*/

    
});


// banner list api
router.get("/admin/banner/list",async(req,res)=>{
try{
    const data = await BannerAddmin.find();
    if(data != null){
        res.status(200).render("banner.ejs",{result:"true",message:"all data lists are",data:data})
    }else{
        res.status(400).json({result:"false",message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
       res.status(402).send({result:"false",message:"get some error",msg:error.message})
  }     

});


// delete banner list api
router.get("/admin/banner/delete/:_id",async(req,res)=>{
try{       
     const id=req.params._id;  
    const banner =await BannerAddmin.findByIdAndDelete(id);       
    if(banner.length==0){
        res.status(404).render('banner',{result:false,message:"Record not found"});
    }else{
     res.status(201).redirect("/admin/banner/list");/*({ result: true, message: "data deleted successful", data: banner}) */
    }
 
}
    catch(error){

             res.status(400).json({result:false,message:"data does not deleted",msg:error.message})
    }
});

module.exports=router;