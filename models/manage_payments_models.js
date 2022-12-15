
// create user location model schema
const mongoose=require('mongoose');
const managePaymentsSchema = new mongoose.Schema({

bank_acc_no:{         
	type:String,
	required:true
},
userId:{         
	type:String
	
},
ifsc_code:{         
	type:String
	
},
bank_name:{         
	type:String
	
},
branch_name:{         
	type:String
	
},
state:{         
	type:String
	
},
user_name:{         
	type:String
	
},

},{timestamps:true});
module.exports =ManagePayments= mongoose.model("ManagePayments",managePaymentsSchema);