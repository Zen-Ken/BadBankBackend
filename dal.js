require("dotenv").config();
const { json } = require('express');


const MongoClient = require('mongodb').MongoClient;
const url         = process.env.CONNECTION_STRING;

const mongoClient = new MongoClient(url);
const db          = mongoClient.db('badBank');



async function create(name, email, password){
    var doc = { name: name, email: email, password: password, balance: 0.00 }
    try {
        const collection  = db.collection("users")
        const result = await collection.insertOne(doc);
        console.log("Inserted Success: _id=" + result.insertedId);
        
    } 
    catch (err ){
        console.log("Inserted Failed --------------------------------------");
        console.log(err);
    }
    finally {
        // Close the database connection when finished or an error occurs
        return doc;
    }
}

async function find(email){
    var result;
    try {
        const collection  = db.collection("users")
        result = await collection.find({email: email}).toArray();
    } 
    catch (err){
        console.log("find() Failed");
        console.log(err);
    }
    finally {
        // Close the database connection when finished or an error occurs
        return result;
    }
}

async function findOne(email){
    var result;
    try {
        const collection  = db.collection("users")
        result = await collection.findOne({email: email});
    } 
    catch (err){
        console.log("findOne() Failed");
        console.log(err);
    }
    finally {
        // Close the database connection when finished or an error occurs
        return result;
    }
}

async function update(email, amount){
    try {
        const collection  = db.collection("users")
        result = await collection.findOneAndUpdate({email: email},{$inc: { balance: amount }},{ returnDocument: 'after' });
        //result = await collection.updateOne({email: email},{$inc: { balance: 33 }}).toArray();
    } 
    catch (err){
        console.log("update() Failed");
        console.log(err);
    }
    finally {
        // Close the database connection when finished or an error occurs
        return result.value;
    }
}
async function findAll(){
    try {
        const collection  = db.collection("users")
        result = await collection.find({}).toArray();
    } 
    catch (err){
        console.log("find() Failed");
        console.log(err);
    }
    finally {
        // Close the database connection when finished or an error occurs
        return result;
    }
}

async function updateUser(email, name, newEmail, newName){
    try {
        const collection  = db.collection("users")
        // HOW TO UPDATE MongoDB document
        if(newEmail != email)
        {
            console.log("Emails different");
            if(await find(newEmail).then((user=>{ return user.length})) > 0){
                throw "Can't change email, email already exists";
            }
        }
        await collection.updateOne(
            {email: email},
            {$set: {email: newEmail, name: newName}},
            { returnNewDocument : true, returnDocument: 'after' }
        )
        console.log("User Updated");
        result = await find(newEmail).then((user=>{ return user}))
        return result.value;
    } 
    catch (err){
        console.log("update() Failed");
        console.log(err);
    }
}
module.exports = {create, find, findOne, update, findAll, updateUser};