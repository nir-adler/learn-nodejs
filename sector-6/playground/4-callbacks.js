const add = ((a, b, callback) => {
    setTimeout(()=>{
        callback(a+b)
    },2000)
})

add(5,10,(data)=>{
    console.log(data)
})

