const doWork=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        // resolve('Success!')
        reject('Error')
    },2000)


})

doWork.then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})