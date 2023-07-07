const { json } = require('express');
const { update, find, create, findAll} = require('./dal');


(
    async ()=>{
        console.log(await findAll({}));
    }
    // async function testconnection() {
    //     try {
    //         await mongoClient.connect();
    //         console.log("Connected successfully to db server");
    //     } 
    //     catch {
    //         console.log("Connected failed");
    //     }
    //     finally {
    //         // Close the database connection when finished or an error occurs
    //         await mongoClient.close();
    //     }
    // }
)()
