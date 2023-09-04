const mongoose=require('mongoose')


const tokenschema=mongoose.Schema({
    token:{
        type:String,
        required:true
    }
})
 const Token=new mongoose.model('token',tokenschema);

 module.exports={Token}