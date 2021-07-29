const doWork=(callback)=>{
    setTimeout(()=>{
        callback('error',[1,3,7])
    },2000)
}



doWork((error,data)=>{
    if(error){
       return  console.log(error)
    }
    console.log(data)
})