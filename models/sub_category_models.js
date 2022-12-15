

// create user location model schema
const mongoose=require('mongoose');
const subcategorySchema = new mongoose.Schema({

sub_category_name:{         
	type:String,
	required:true
},
image:{         
	type:String
	
},
category_name:{         
	type:String
	
},



},{timestamps:true});
module.exports =SubCategory= mongoose.model("SubCategory",subcategorySchema);