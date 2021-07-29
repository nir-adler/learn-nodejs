const mongoose=require('mongoose')
const validator=require('validator')

const User=mongoose.model('Users',{
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minLength:6,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contin "password"!')
            }
        }
    },
    age:{
        type:Number,
        default:()=>1
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email not valid!')
            }
        }
    }
})


module.exports={
    User
}