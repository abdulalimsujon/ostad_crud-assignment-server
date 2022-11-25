const express = require('express');
const cors = require('cors');

require('dotenv').config()

const port = process.env.PORT || 8000;


const app = express();

//use middleware
//shopUser
//lzSNoDl914lDn7Ya

app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, MongoRuntimeError, ObjectId } = require('mongodb');
// const uri = "mongodb+srv://shopUser:zETtOQT5CHyRB9Xk@cluster0.r1brawf.mongodb.net/?retryWrites=true&w=majority";


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.r1brawf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {

    try {
        await client.connect();
        const collection = client.db("foodExpress").collection("userList");

        // create
        app.post('/user', async (req, res) => {
            const user = req.body;

            const result = await collection.insertOne(user);


            res.send(result);
        })

        //get all data

        app.get('/user', async (req, res) => {

            const query = {};

            const result = await collection.find(query).toArray();

            res.send(result);
        })

        //delete
        app.delete('/user/:id', async (req, res) => {

            const id = req.params.id;
            console.log(id);
            const query = { _id: ObjectId(id) }



            const result = await collection.deleteOne(query);

            res.send(result);
        })
        app.put('/user/:id', async (req, res) => {


            const updatedUser = req.body;
            const id = req.params.id;

            const query = { _id: ObjectId(id) }


            const options = { upsert: true };


            const updateDoc = {
                $set: {

                    name: updatedUser.name,
                    product: updatedUser.product,
                    quantity: updatedUser.quantity,
                    date: updatedUser.date


                },
            };

            const result = await collection.updateOne(query, updateDoc, options);
            res.send(result);
        })





    }

    finally {
        // await client.close();
    }

}
run().catch(console.dir);












app.listen(port, () => {
    console.log('crud server is running')
})