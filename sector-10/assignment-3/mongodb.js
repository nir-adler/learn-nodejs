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

    const updatePromise = db.collection('users').updateOne({
            _id: ObjectId("60f008ba011cdf77f51d2179")
        },
        {
            $inc: {
                age: 1
            }
        })

    updatePromise.then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    db.collection('tasks').updateMany({
        completed:undefined
    },
        {
            $set:{
                completed:true
            }
        }).then((result)=>{
            console.log(result)
    }).catch(error=>{
        console.log(error)
    })

})


