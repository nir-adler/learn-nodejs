const {MongoClient, ObjectId} = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager-1'


MongoClient.connect(connectionUrl, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log(error)
    }

    const db = client.db(databaseName)

    // db.collection('tasks').findOne({
    //     _id: ObjectId("60f164058be6e4b32d54794d")
    // }, (error, result) => {
    //     if (error) {
    //         console.log(error)
    //     }
    //
    //     console.log(result)
    // })
    //
    // const find = db.collection('tasks').find({
    //     completed: false
    // })

    db.collection('tasks').deleteOne({
        description: 'wash my car'
    }).then((result)=>{
        console.log(result)
    }).catch((e)=>{
        console.log(e)
    })

    // db.collection('tasks').updateMany({completed: false}, {
    //     $set: {
    //         completed: true
    //     }
    // },(error,result)=>{
    //     if(error){
    //         console.log(error)
    //     }
    //
    //     console.log(result)
    // })

    // find.toArray((error,result)=>{
    //     if(error){
    //         console.log(error)
    //     }
    //     console.log(result)
    // })
    // db.collection('tasks').insertMany([
    //     {
    //         description: 'wash my car',
    //         completed: false
    //     },
    //     {
    //         description: 'call mom',
    //         completed: false
    //     }
    // ],(error,result)=>{
    //     if(error){
    //         console.log(error)
    //     }
    //     console.log(result)
    // })


})