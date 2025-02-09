const { MongoClient } = require("mongodb");
const URL = "mongodb://localhost:27017"
const client = new MongoClient(URL)

async function getConnection() {
    let result = await client.connect()
    let db = result.db("Marvellous")
    return db.collection("Batches")
}

async function readData() {
    let data=await getConnection();
    data=await data.find().toArray();
    console.log("Data retrieved from database:")
    console.log(data)
}

async function insertData() {
    let data=await getConnection();
    let result = await data.insertOne({
        "Name":"Python","Fees":"20000","Duration":"2.5 months"
    })
    if(result.acknowledged){
        console.log("data inserted successfully")
    }
}

async function deleteData() {
    let data=await getConnection();
    let result = await data.deleteOne({
        "Name":"Python"
    })
    if(result.acknowledged){
        console.log("Data deleted successfully")
    }
}

async function updateData() {
    let data=await getConnection();
    let result = await data.updateOne({
        "Name":"LB"
    },
    {$set:{"Fees":"25000"}})
    if(result.acknowledged){
        console.log("Data updated successfully")
    }
}

function main(){
    let ret;

    ret=getConnection();
    console.log(ret)
    console.log("Database connection is successful")
    readData();
    // insertData();
    // deleteData();
    // updateData()
}

main()