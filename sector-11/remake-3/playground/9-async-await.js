const add=(a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            reject('Error')
        },1000)
    })
}


const doWork=async(a,b)=>{
    const sum = await add(a,b)
    const sum1=await add(10,sum)
    const sum2=await add(10,sum1)
    return sum2
}

doWork(10,5).then((sum)=>{
    console.log(sum)
}).catch((e)=>{
    console.log(e)
})