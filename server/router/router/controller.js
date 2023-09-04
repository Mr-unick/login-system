const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const ACCES_SERCRET_KEY='OmCsqoIXNdBU7gzJbBCpNcdCSufQXyylkCBMcrHChI6I2Mi8N9oB773V06Krftw'
const REFRESH_SERCRET_KEY='IDnZF9OgpoQ8Bz0NuQLv6XrMFAp44pRf8lLnNT1jupplt54LgnfnglMZKc6UIlq1'
const { User } = require("../db/scheama");
const { toekn, Token } = require('./tokenschema');


// signup controller
const signup= async(req,res)=>{

try{

// check Existing user

const existinguser= await User.findOne({email:req.body.email})
const existigusername= await User.findOne({username:req.body.username})

if(existinguser){
    return res.send({msg:`Email alredy taken !!`,})
}
if(existigusername){
    return res.send({msg:`Username is alredy taken !!`})
}


// hash password

    const hashpassword=await bcrypt.hash(req.body.password,10)

// user creation
    const user={username:req.body.username,email:req.body.email,password:hashpassword}
    const newuser=new User(user);
    await newuser.save();
    return res.send({succes:true,msg1:'Signup Successfull !!',
                    username:user.username,
                    password:req.body.password})
}

catch(error){
    return res.send({msg:`All fields required !!`,
error:error})

}
}

// login controller

const login= async(req,res)=>{
   
let user= await User.findOne({username:req.body.username})
   if(!user){
    return res.send({msg:'User Not Found !'})
   }
   try{
let match=await bcrypt.compare(req.body.password,user.password)
if(match){

        // token generation 
    const accestoken= jwt.sign(user.toJSON(),ACCES_SERCRET_KEY)
    const refreshtoken=jwt.sign(user.toJSON(),REFRESH_SERCRET_KEY)
    const newtoken= new Token({
        token:refreshtoken
    })
    await newtoken.save();
    return res.status(200).send({succes:true,accestoken:accestoken,refreshtoken:refreshtoken,username:user.username,email:user.email})

}else{
    return res.send({msg:'Wrong Password !'})
}
   }
   catch(error){
     res.send({msg:'SOMETHING WENT WRONG'})
     console.log(error)
   }
}
module.exports={signup,login}