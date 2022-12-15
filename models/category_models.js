

// create user location model schema
const mongoose=require('mongoose');
const categorySchema = new mongoose.Schema({

category_name:{         
	type:String,
	required:true
},
image:{         
	type:String
	
},


},{timestamps:true});
module.exports =Category= mongoose.model("Category",categorySchema );