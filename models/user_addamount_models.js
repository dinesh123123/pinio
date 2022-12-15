

// create user location model schema
const mongoose=require('mongoose');
const addamountSchema = new mongoose.Schema({

add_amount:{         
	type:String,
	
},
userId:{         
	type:String
	
},


},{timestamps:true});
module.exports =Addamount= mongoose.model("Addamount",addamountSchema );