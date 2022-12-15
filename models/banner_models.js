
// create product model schema
const mongoose=require('mongoose');
const bannerSchema = new mongoose.Schema({
banner_title:{
	type:String,
	uppercase:true
	
},

date:{
	type:String,
},
image:{
		type:String,
	},


},{timestamps:true});
module.exports = BannerAddmin= mongoose.model("BannerAddmin",bannerSchema);
