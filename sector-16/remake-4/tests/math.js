const {add}=require('../src/math')
const request=require('supertest')


test('Should add a + b',(done)=>{
    add(2,3).then((sum)=>{
        expect(sum).toBe(5)
        done()
    }).catch((e)=>{
        console.log(e)
    })

})