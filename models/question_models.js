// Create user Schema
const mongoose =require("mongoose");
const questionSchema=mongoose.Schema({

category_name:{
           type:String,   
},
 sub_category_name: {
            type: String,
 },
 categoryId: {
            type: String,
 },
 subcategoryId: {
            type: String,
 },
 image: {
             type: String,
 },
 question: {
       type: String,
       
 },
 answer: {
        type: String,
 },
 optiona: {
        type: String,
 },
 optionb: {
        type: String,
 },
 optionc: {
       type: String,
 },
 optiond: {
       type: String,
 },
 exp_date:{
           type:String,         
},
yes_prize:{
           type:String,         
},
no_prize:{
           type:String,         
},
event_prize:{
           type:String,         
},
volume_prize:{
           type:String,         
},
description:{
           type:String,         
},

types:{
     type:String,
           
},
},{timestaps:true});

module.exports=Question=mongoose.model('Question',questionSchema);