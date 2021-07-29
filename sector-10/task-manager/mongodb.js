// CRUD create read update delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log(error)
    }

    console.log('Connected correctly!')
    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name: 'Andrew',
    //     age: 27
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable insert user.')
    //     }
    //     console.log(result)
    // })

    db.collection('users').insertMany(
        [{
            name: 'Naama',
            age: 32
        },
            {
                name: 'Guy',
                age: 32
            }],(error,result)=>{
            if(error){
                return console.log('Unable to insert user.')
            }
            console.log(result)
        })
})


