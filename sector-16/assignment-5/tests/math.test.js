const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math')


// test('Test add function', () => {
//     const sum = add(5, 10)
//     expect(sum).toBe(15)
// })

test('Test calculateTip function', () => {
    const tip = calculateTip(10)
    expect(tip).toBe(12.5)
})

test('Test fahrenheitToCelsius fucntion', () => {
    const temp = fahrenheitToCelsius(32)
    expect(temp).toBe(0)
})

test('Should convert c to f', () => {
    const temp = celsiusToFahrenheit(0)
    expect(temp).toBe(32)
})

test('Should add two numbers', () => {
    add(5, 10).then((sum) => {
        expect(sum).toBe(15)
    })
})

test('Should add two numbers await/async', async() => {
    const sum = await add(5, 10)
    expect(sum).toBe(15)
})