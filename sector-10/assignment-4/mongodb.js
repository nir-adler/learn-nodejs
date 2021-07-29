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

    // db.collection('users').deleteMany({
    //     age: 27
    // }).then((result) => {
    //     console.log(result)
    // }).catch(error => {
    //     console.log(error)
    // })

    db.collection('tasks').deleteOne({
        task:'pay bills'
    }).then(result=>{
        console.log(result)
    }).catch(error=>{
        console.log(error)
    })
})


