// import dependancies in controllers js files
const User=require("../models/user_models");
const Otp=require("../models/otp_models");
const BannerAddmin=require("../models/banner_models");
const PrivacyPolicy=require("../models/privacy_policy_models");
const TermCondition=require("../models/term_condiction_models");
const ContactUs =require("../models/contact_models");
const Notification=require("../models/notification_models");
const ManagePayments=require("../models/manage_payments_models");
const SubCategory=require("../models/sub_category_models");
const VerifyAccount=require("../models/verify_account_models");
const Addamount=require("../models/user_addamount_models");
const Question=require("../models/question_models");


const otpGenerator =require('otp-generator');




//create  user signup and login
 const User_Signup=async(req,res)=>{
    const {phone,FCM_id}=req.body;
    if(phone && FCM_id){

    const user_profile= await User.findOne({phone:phone});
    if(user_profile){
    const OTP =otpGenerator.generate(4,{digits:"true",upperCaseAlphabets: false, specialChars:false,lowerCaseAlphabets:false});
const otp =new Otp ({phone:phone,FCM_id:FCM_id,otp:OTP});
const result =await otp.save();
res.status(200).send({result:"true",message:'user allready Registered',_data:result}) 
    }
    else{
        
                try{
                    
                const user=new User({phone:req.body.phone,FCM_id:FCM_id});
                const userData=await user.save()
                //otp generate
const OTP =otpGenerator.generate(4,{digits:"true",upperCaseAlphabets: false, specialChars:false,lowerCaseAlphabets:false});
const data =new Otp ({phone:phone,FCM_id:FCM_id,otp:OTP});
const result =await data.save();          
res.status(200).send({result:"true",message:'user signup',data:result,userDetails:userData})
    
    }catch(error){
        console.log(error.message)
    res.status(200).json({result:"false",message:" name is not valid",msg:error.message})
}

  }
  }else{
    res.status(400).json({result:"false",message:" require parameter is  phone,FCM_id"})
  }  

};




// create verify otp api
const verifyOtp =async(req,res)=>{
    const {phone,otp,otp_id}=req.body;

    try{
        if(otp && otp_id){
    const otpHolder =await Otp.find({"_id":otp_id,otp})
    if(otpHolder.length>0){
        res.status(200).send({
            result:"true",
            message:"login sucessfully",
            data:otpHolder
        })
    }
    else{
        return res.status(400).send({result:"false",message:"invalid otp"})
    }
}else{
    res.send({result:"false",message:" required parameters are otp_id, otp"});
}
}catch(error){
            console.log(error.message)
            res.status(400).json({result:"false",message:"You try to again",msg:error.message})
        }
};




// create userLogout api
 const UserLogout=async(req,res)=>{
    const {login_id,FCM_id}=req.body;
    try{ 
        if(login_id){
        const updateData=await Otp.findOneAndUpdate({"_id":login_id},
            {$set:{FCM_id:FCM_id}},{new:true});
             res.status(200).send({result:"true",message:'logout sucessfully',data:updateData})
  
     }else{
         res.send({result:"false",message:"required parameters is login_id ,FCM_id note send fcm id null"});
}
      }catch(error){
            
            res.status(400).json({result:"false",message:"does not logout",msg:error.message})
        }

 };




// create resend otp api
const UserResendOtp=async(req,res)=>{
    const {phone,FCM_id}=req.body;
    if(phone && FCM_id){
        try{

    const user_profile= await User.findOne({phone:phone});
    if(user_profile){
    const OTP =otpGenerator.generate(4,{digits:true,upperCaseAlphabets: false, specialChars:false,lowerCaseAlphabets:false});
const otp =new Otp ({phone:phone,FCM_id:FCM_id,otp:OTP});
const result =await otp.save();
res.status(200).send({result:"true",message:'sent otp sucessfully',data:result}) 
    }
    else{
        res.status(400).send({result:"false",message:'signup first'}) 
}
}catch(error){
    res.status(400).json({result:"false",message:"get some error",msg:error.message})

}
}else{
    res.send({result:"false",message:"required parameters is phone,FCM_id"});
}

};



//get privacy policy api
const PrivacyPolicyList=async(req,res)=>{
    try{
    const data_list= await PrivacyPolicy.find();
    if(data_list != null){
        res.status(200).json({result:"true",message:"all data lists are",data:data_list})
    }else{
        res.send({result:"false",message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
    res.status(200).json({result:"false",message:"data list does not found",msg:error.message})
  }     
};



// term condition list api using get method
const TermAndCondictionList=async(req,res)=>{
    try{
    const data_list= await TermCondiction.find();
    if(data_list != null){
        res.status(200).json({result:"true",message:"all data lists are",data:data_list})
    }else{
        res.send({result:"false",message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
    res.status(200).json({result:"false",message:"data list does not found",msg:error.message})
  }     
};




//create google login api
const GooleLogin=async(req,res)=>{
const {google_id,name,email,FCM_id}=req.body;
    try{
        let existingUser = await User.findOne({ google_id:google_id});
        if(google_id && name && email && FCM_id){
            let existingUser = await User.findOne({ google_id:google_id});
            if (!existingUser) {
                const newUser = new User({
                      google_id:google_id,
                      name:name,
                      email:email,
                      FCM_id:FCM_id
 
});
       const user = await newUser.save();
 const data =new Otp ({FCM_id:FCM_id});
 const result =await data.save(); 
       res.status(200).json({result:"true",message:"You are login sucessfully",data:user})
}else{
res.send({result:"false",message:"You are allready login"})
}
            }else{
                res.send({result:"false",message:"parameter required google_id,name,email,FCM_id"});
            }

        }
        catch(error){
            console.log(error.message)
            res.status(400).json({result:"false",message:"You are not login",msg:error.message})
        }


 };



// create user details update
const UserDetailsUpdate=async(req,res)=>{
     try{
        const {userId,name,dob,phone,email,state}=req.body;
       
        const userData=await User.findOne({"_id":userId});
    if(userData) {
   const updateUser_data= await User.findOneAndUpdate({"_id":req.body.userId},{$set:{name,dob,phone,email,state}},
{new:true});
   const userdata=await updateUser_data.save();
   res.send({result:"true", message: "user data updated successfully.",data:userdata})  
    }else{
        
    res.status(400).json({result:"false",message:"userId required"});
}

}catch(error){
    res.status(400).send({result:"false",message:"updated error id "  + req.params._id, msg:error.message});
}
};



// create user profile update api
const UserProfileUpdate=async(req,res)=>{
    const {userId}=req.body;
    try{
    const user_profile= await User.findOne({"_id":userId});
    if(user_profile){
        if(req.file){
            var profileRecord={
        userId:req.body.userId,
        image:req.file.filename
    }

   }else{
var profileRecord={
       userId:req.body.userId,
        
    }
   }
 const updateUser_data= await User.findOneAndUpdate({"_id":req.body.userId},(profileRecord),     
{new:true});
       const profile=await updateUser_data.save();
   res.send({result:"true", message: "user profile updated successfully.",data:profile})  
    
    }else{
         res.status(400).json({result:"false",message:"parameter required userId"});
    }
        
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};




// create  user contact Us api
const UserContactUs=async(req,res)=>{
    try{
        const  {userId,email,user_name,mobile,issue,issue_details}=req.body;
        if(userId && email && user_name && mobile && issue && issue_details){
        const contact=new ContactUs({
                                userId:userId,
                                email:email,
                                user_name:user_name,
                                mobile:mobile,
                                issue:issue,
                                issue_details:issue_details
                            
});
        const result= await contact.save();
        res.status(200).json({result:"true",message:" insert sucessfully",data:result});
    }
    else{
    res.status(400).json({result:"false",message:"parameter required userId,email,user_name,mobile,issue,issue_details"});
}

}catch(error){
    res.status(400).send({result:"false",message:"get some error", msg:error.message});
}
    
};



// create notification list api
const  NotificationApi=async(req,res)=>{
    try{
    const data_list= await Notification.find();
    if(data_list != null){
        res.status(200).json({result:"true",message:"all data lists are",
                              "path":"http://103.104.74.215:3055/uploads/",data:data_list})
    }else{
        res.status(400).json({result:"false",message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
       res.status(402).send({result:"false",message:"get some error",msg:error.message})
  }     

};




// create category list api
const  CategoryApi=async(req,res)=>{
    try{
    const data_list= await Category.find();
    if(data_list != null){
        res.status(200).json({result:"true",message:"all data lists are",
                              "path":"http://103.104.74.215:3055/uploads/",data:data_list})
    }else{
        res.status(400).json({result:"false",message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
       res.status(402).send({result:"false",message:"get some error",msg:error.message})
  }     

};



//create sub category list api
const  SubCategoryApi=async(req,res)=>{
    try{
    const data_list= await SubCategory.find();
    if(data_list != null){
        res.status(200).json({result:"true",message:"all data lists are",
                              "path":"http://103.104.74.215:3055/uploads/",data:data_list})
    }else{
        res.status(400).json({result:"false",message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
       res.status(400).send({result:"false",message:"get some error",msg:error.message})
  }     

};



// create manage account api
const ManageAccount=async(req,res)=>{
    try{
        const  {userId,bank_acc_no,ifsc_code,bank_name,branch_name,state,user_name}=req.body;
        if(userId && bank_acc_no && ifsc_code && bank_name && branch_name && user_name && state){
        const contact=new ManagePayments({
                                userId:userId,
                                bank_acc_no:bank_acc_no,
                                ifsc_code:ifsc_code,
                                bank_name:bank_name,
                                branch_name:branch_name,
                                state:state,
                                user_name:user_name
                            
});
        const result= await contact.save();
        res.status(200).json({result:"true",message:" insert sucessfully",data:result});
    }
    else{
    res.status(400).json({result:"false",message:"parameter required userId,bank_acc_no,ifsc_code,bank_name,branch_name,state,user_name"});
}

}catch(error){
    res.status(400).send({result:"false",message:"get some error", msg:error.message});
}
    
};



// create verify account api
const VerifyAccounts=async(req,res)=>{
     try{
        const  {userId,pancard,dob}=req.body;
        if(userId && pancard && dob ){
        const contact=new VerifyAccount({
                                userId:userId,
                                pancard:pancard,
                                dob:dob
});
        const result= await contact.save();
        res.status(200).json({result:"true",message:" insert sucessfully",data:result});
    }
    else{
    res.status(400).json({result:"false",message:"parameter required userId,pancard,dob"});
}

}catch(error){
    res.status(400).send({result:"false",message:"get some error", msg:error.message});
}
    

};



// create add amount  api
const AddAmount=async(req,res)=>{
    try{
        const  {userId,add_amount}=req.body;
        if(userId && add_amount){
        const contact=new Addamount({
                                userId:userId,
                               add_amount:add_amount
                         
});
        const result= await contact.save();
        res.status(200).json({result:"true",message:" add amount sucessfully",data:result});
    }
    else{
    res.status(400).json({result:"false",message:"parameter required userId,add_amount"});
}

}catch(error){
    res.status(400).send({result:"false",message:"get some error", msg:error.message});
}
    

};




//create banner list api
const  BannerList=async(req,res)=>{
    try{
    const data_list= await BannerAddmin.find();
    if(data_list != null){
        res.status(200).json({result:"true",message:"all data lists are",
                              "path":"http://103.104.74.215:3055/uploads/",data:data_list})
    }else{
        res.status(400).json({result:"false",message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
       res.status(400).send({result:"false",message:"get some error",msg:error.message})
  }     

};



// create question get api
const  QuestionList=async(req,res)=>{
try{
    const data = await Question.find();
    if(data != null){
        res.status(200).json({result:"true",message:"all data lists are",
                                "path":"http://103.104.74.215:3055/uploads/",data:data})
    }else{
        res.status(400).json({result:"false",message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
       res.status(402).send({result:"false",message:"get some error",msg:error.message})
  }
  };     

module.exports={
    User_Signup,
    verifyOtp,
    UserLogout,
    UserResendOtp,
    PrivacyPolicyList,
    TermAndCondictionList,
    GooleLogin,
    UserDetailsUpdate,
    UserProfileUpdate,
    UserContactUs,
    NotificationApi,
    CategoryApi,
    SubCategoryApi,
    VerifyAccounts,
    ManageAccount,
    AddAmount,
    BannerList,
    QuestionList

}