const auth=async(req,res,next)=>{
    
    if(true){
        res.status(400).send({error:'error'})
    }


    next()
}


module.exports={
    auth
}