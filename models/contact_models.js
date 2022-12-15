// Create user Schema
const mongoose =require("mongoose");
const contactSchema=mongoose.Schema({

email:{
           type:String,   
},
 
 user_name: {
       type: String,
        uppercase:true,
 },
 mobile: {
        type: String,
 },
 userId: {
        type: String,
 },
 issue: {
        type: String,
 },
   issue_details: {
       type: String,
 },
 
},{timestaps:true});

module.exports=ContactUs=mongoose.model('ContactUs',contactSchema);