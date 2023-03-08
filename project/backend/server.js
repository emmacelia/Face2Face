const express = require('express')
const app = express()
const port = 4000

//Declares body parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//uses cors
const cors = require("cors");
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

const mongoose = require('mongoose');

mongoose.set('strictQuery', true)
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb+srv://root:root@users.syebd7u.mongodb.net/?retryWrites=true&w=majority');
    //await mongoose.connect('mongodb+srv://admin:admin@cluster0.rpvx1ef.mongodb.net/?retryWrites=true&w=majority');
    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

//create recipie schema
const UserSchema = new mongoose.Schema({
    Username: String,
    Score: String,
    Level: String
    
});
//creates recipie model
const UserModel = mongoose.model('Users', UserSchema);


//Gets The recipies model 
app.get("/", async (req, res) => {

const kittens1= new UserModel({
    Username: "Conor",
    Score: "12",
    Level: "2"
})

await kittens1.save();



const kittens = await UserModel.find();
console.log(kittens);

})



app.listen(port, () => {
    console.log(`listening on port ${port}`)
})