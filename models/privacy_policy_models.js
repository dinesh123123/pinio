// create how to play  model schema
const mongoose=require('mongoose');
const termCondictionSchema = new mongoose.Schema({

title:{
	type:String
	 
},
privacy_policy_text:{
	type:String,
	required:true,
},



},{timestamps:true});
module.exports =PrivacyPolicy= mongoose.model("PrivacyPolicy",termCondictionSchema);