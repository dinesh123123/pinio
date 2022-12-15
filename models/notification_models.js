

// create user location model schema
const mongoose=require('mongoose');
const userNotificationSchema = new mongoose.Schema({

title:{         
	type:String,
	required:true
},
image:{         
	type:String
	
},

description:{         
	type:String,
	required:true
},

},{timestamps:true});
module.exports =new mongoose.model("Notification",userNotificationSchema);