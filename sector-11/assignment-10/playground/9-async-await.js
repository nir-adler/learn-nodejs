const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a+b)
        }, 2000)
    })
}

const f=async (a,b)=>{
    try{
        const sum=await add(a,b)
        const sum1=await add(10,sum)
        const sum2=await add(20,sum1)
        return sum2
    }catch (e){
        console.log(e)
        return 'Error'
    }
}

f(10,10).then((result)=>{
    console.log(result)
})

// const sum=(a,b,callback)=>{
//     setTimeout(()=>{
//         callback('error',undefined)
//     },2000)
// }
//
// sum(1,3,(error,sum)=>{
//     if(error){
//         return console.log(error)
//     }
//     console.log(sum)
// })