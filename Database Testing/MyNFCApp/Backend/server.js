const express = require('express')
const app = express()
c

//Declares body parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const path = require('path');
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));

//uses cors
const cors = require("cors");
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

//connection to mongo database
const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb+srv://root:<password>@users.syebd7u.mongodb.net/?retryWrites=true&w=majority');
}

//create recipie schema
const UserSchema = new mongoose.Schema({
    Username: String,
    Score: String,
    Level: String,
    
});
//creates recipie model
const UserModel = mongoose.model('User', UserSchema);

//posts to the recipie page 
app.post('/api/user', (req, res) => {
    console.log(req.body);

    //creates a recipie to display
    UserModel.create({
        Username: req.body.Username,
        Score: req.body.Score,
        Level: req.body.Level,
    })

    res.send('Data Recieved');
})

//Gets The recipies model 
app.get("/api/UserModel", (req, res) => {
    UserModel.find((error, data) => {
        res.json(data);
    })

})

//builds project 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../build/index.html'));
});


app.listen(port, () => {
    console.log(`listening on port ${port}`)
})