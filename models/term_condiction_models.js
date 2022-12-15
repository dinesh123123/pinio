// create how to play  model schema
const mongoose=require('mongoose');
const CondictionSchema = new mongoose.Schema({
title:{
	type:String,
	
},
term_condiction_Text:{
	type:String,
	required:true,
},



},{timestamps:true});
module.exports =TermCondiction= mongoose.model("TermCondiction", CondictionSchema);