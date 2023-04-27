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
    // Connect the client to the server	(optional starting in v4.7)
    const insertData= async () => {
        let data=await MongoClient();
        let result= await data.insert({
            name:"shuvo", 
            price:20, 
            quantity:5
             
         })

         console.log('inserted', result);
    }
    await client.db("admin").command({ ping: 1 });
    


    
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


const app=express();



app.get('/', (req, res)=>{
    res.send('req res created');
})

app.listen(3000);