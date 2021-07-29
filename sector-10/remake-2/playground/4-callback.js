const doWork=(callback)=>{
    setTimeout(()=>{
        callback('Error',undefined)
    },2000)
}

doWork((error,result)=>{
    if(error){
        return console.log(error)
    }
    console.log(result)
})