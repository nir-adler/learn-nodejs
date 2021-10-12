const {add}=require('../src/math')

test('Add two numbers',()=>{
    const total=add(5,10)
    expect(total).toBe(13)
})

