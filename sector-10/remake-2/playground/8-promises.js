const doWork=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('Error')
    },2000)

})

doWork.then((result)=>{
    console.log(result)
},(error)=>{
    console.log(error)
})