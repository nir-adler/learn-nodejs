const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

const doWork = async() => {
    const sum = await add(10, 5)
    const sum1 = await add(sum, 10)
    const sum2 = await add(sum1, 10)
    return sum2
}


doWork().then((sum) => {
    console.log(sum)
}).catch((e) => {
    console.log(e)
})