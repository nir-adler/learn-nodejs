const fs=require('fs')

const getNotes=()=>{
    const data=fs.readFileSync('./notes.txt').toString()
    console.log(data)
}



module.exports={
    getNotes
}