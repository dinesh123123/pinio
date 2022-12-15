

// create user location model schema
const mongoose=require('mongoose');
const verifySchema = new mongoose.Schema({

pancard:{         
	type:String,
	required:true
},
userId:{         
	type:String
	
},
dob:{         
	type:String
	
},



},{timestamps:true});
module.exports =VerifyAccount= mongoose.model("VerifyAccount",verifySchema );