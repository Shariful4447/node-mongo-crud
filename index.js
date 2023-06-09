const express=require('express');
const bodyParser = require('body-parser');


const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
const uri = "mongodb+srv://roslinshuvo:gUui1dz3JlvzlnnG@cluster0.w2aoa6h.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});




//run().catch(console.dir);

//middleware function
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
})




app.post('/add-product',async (req, res)=>{
    await client.connect();
    const db = client.db('myData');
    // Use the collection "people"
    const col = db.collection("products");

    const product=req.body;
    console.log(product);
    const result = await col.insertOne(product);
    res.send('success');
    //res.redirect('/product');
   

})

// app.get('/product', (req, res)=>{
//     res.sendFile(__dirname + '/product.html');
// })

app.get('/product', async (req, res)=>{
    await client.connect();
    const productCollection = client.db('myData').collection("products");
    
   
    const products = await productCollection.find({}).toArray();
    res.send(products)

    

    
})

app.get('/product/:id', async (req, res)=>{
    await client.connect();
    const productCollection = client.db('myData').collection("products");
    const id = req.params.id;
    // console.log('trying to delete', id);
    var Object = require('mongodb').ObjectId;
    const query = { _id:new Object(id) }
    const products = await productCollection.find({query}).toArray();
    res.send(products)
})

app.delete('/delete/:id', async (req, res) => {
    await client.connect();
    const id = req.params.id;
    // console.log('trying to delete', id);
    var Object = require('mongodb').ObjectId;
    const query = { _id:new Object(id) }
    const productCollection = client.db('myData').collection("products");
    const result = await productCollection.deleteOne(query);
    console.log(result);
    res.send(result);
});



app.listen(3000);