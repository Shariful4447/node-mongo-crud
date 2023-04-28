const express=require('express');


const { MongoClient, ServerApiVersion} = require('mongodb');
const uri = "mongodb+srv://roslinshuvo:gUui1dz3JlvzlnnG@cluster0.w2aoa6h.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db('myData');
         // Use the collection "people"
         const col = db.collection("products");
         // Construct a document                                                                                                                                                              
         let product = {
             name: 'Shuvo',
             price:20,
             quantity:4
         }
         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(product);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc);
        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}
run().catch(console.dir);


const app=express();



app.get('/', (req, res)=>{
    res.send('req res created');
})

app.listen(3000);