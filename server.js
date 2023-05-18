const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');
require('dotenv').config();
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());


mongoose
    .connect(process.env.MONGO_URI)
    .catch((err)=>console.log(err));

const postSchema = new Schema({
    title: String,
    description: String,
});

const Post = mongoose.model("Post", postSchema);


app.post("/create", (req,res)=>{
    Post.create({
        title: req.body.title,
        description: req.body.description,

    }).then(doc =>console.log(doc))
    .catch((err)=>console.log(err));
});


app.get("/post", (req,res)=>{
    Post.find()
        .then((items)=> res.json(items))
        .catch((err)=> console.log(err))
});

app.delete("/delete/:id", (req,res)=>{
    // console.log(req.params);
    Post
        .findByIdAndDelete({_id: req.params.id})
        .then((doc)=>console.log(doc))
        .catch((err)=>console.log(err));
});

app.put("/update/:id", (req,res)=>{
    // console.log(req.params);
    // console.log(req.body);

    Post
        .findByIdAndUpdate({_id: req.params.id}, 
            {
                title: req.body.title,
                description: req.body.description,  
            })
        .then((doc)=>console.log(doc))
        .catch((err)=>console.log(err));
});

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get("/",(req,res) =>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"));
    });
}
app.listen(process.env.port || 3001, ()=>{
    console.log("Server is running on port 3001");
});