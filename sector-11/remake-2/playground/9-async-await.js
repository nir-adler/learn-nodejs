const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 1000)
    })
}

const sum = async () => {
    try{
        const sum=await add(10,5)
        const sum1=await add(10,sum)
        const sum2=await add(10,sum1)
        return sum2
    }catch (e){
        return e
    }
}

let a=sum()
a.then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})


// add(5,10).then((sum)=>{
//     return add(10,sum)
// }).then((sum1)=>{
//   console.log(sum1)
// }).catch((e)=>{
//     console.log(e)
// })