const {MongoClient, ObjectId} = require('mongodb')

const url = 'mongodb://127.0.0.1:27017'
const databaseName = 'manager-db'

MongoClient.connect(url, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log(error)
    }

    console.log('Coonection success!')

    const db = client.db(databaseName)

    const tasks = db.collection('tasks').find({
        completed: false
    })

    db.collection('tasks').deleteOne({
        description:'pay bills'
    },(error,result)=>{
        if(error){
            return console.log(error)
        }
        console.log(result)
    })

    // db.collection('tasks').updateMany({
    //     completed:false
    // },{
    //     $set:{
    //         completed:true
    //     }
    // },(error,result)=>{
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(result)
    // })

    // tasks.toArray((error,result)=>{
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(result)
    // })
    //

    // db.collection('tasks').findOne({
    //     _id:ObjectId("60f285f5b3c82cd3749647ec")
    // },((error,result)=>{
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(result)
    // }))

    // db.collection('tasks').insertOne({
    //     description:'full day study',
    //     completed:false
    // },((error,result)=>{
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(result)
    // }))
})

