const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.CONNECTION_STRING;;
 
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        const db = client.db('myproject');
        
        // new user
        var name = 'user' + Math.floor(Math.random()*10000);
        var email = name + '@mit.edu';

        // insert into customer table
        var collection = db.collection('customers');
        var doc = {name, email};

        // Find the first document in the collection
        const first = await collection.insertOne(doc, {w:1}, function(err, result) {
            console.log('Document insert');
        });
      } finally {
        // Close the database connection when finished or an error occurs
        await client.close();
      }
}


run().catch(console.error);
/*
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://kluong159:qME3LFXfobpHg0ic@myfirstmongodb.xnhhsv5.mongodb.net/';
 
// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
  console.log("Connected successfully to server");

    // database Name
    const dbName = 'myproject';
    const db = client.db(dbName);

    // new user
    var name = 'user' + Math.floor(Math.random()*10000);
    var email = name + '@mit.edu';

    // insert into customer table
    var collection = db.collection('customers');
    var doc = {name, email};
    collection.insertOne(doc, {w:1}, function(err, result) {
        console.log('Document insert');
    });

    var customers = db
        .collection('customers')
        .find()
        .toArray(function(err, docs) {
            console.log('Collection:',docs);

            // clean up
            client.close();            
    });    

});
*/
