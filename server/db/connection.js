const mongoose=require('mongoose')

const connection=async ()=>{
    try{
      await  mongoose.connect('mongodb://127.0.0.1:27017/bloggapp')
        console.log('connection succesfull')
    }catch(error){
        console.log('connection unsuccesfull',error)
    }
}

module.exports={connection}