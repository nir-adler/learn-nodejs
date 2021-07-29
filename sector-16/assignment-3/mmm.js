const url="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGY5OWFlNjYzOWRjMTE3YmQ0NDEzYTMiLCJpYXQiOjE2MjY5NzA4NTR9.hnNH34t-vEtqOTxpy3NhhvIrXcu_2xHr1598pYRuajo"
const jwt=require('jsonwebtoken')
const token=jwt.sign({_id:'302909866'},'israel')

console.log(jwt.verify(url,"israel"))
