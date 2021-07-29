// CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient, ObjectId} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log(error)
    }

    console.log('Connected correctly!')
    const db = client.db(databaseName)

    // db.collection('users').findOne({
    //     _id: ObjectId("60f00506642cc405dfefc1b0")
    // }, (error, result) => {
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(result)
    // })

    db.collection('users').find({age: 27}).toArray((error,result)=>{
        if(error){
            return console.log(error)
        }
        console.log(result)
    })
    db.collection('users').find({age: 27}).count((error,result)=>{
        if(error){
            return console.log(error)
        }
        console.log(result)
    })

})


