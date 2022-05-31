
const express =require('express');
const bodyParser = require('body-parser');

var app = express();
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todo');
const trySchema = new mongoose.Schema({
    name : String
});

const item = mongoose.model("second",trySchema);

app.get("/",function(req,res){
    item.find({},function(err,foundItem){
        
            res.render("list",{ejes:foundItem})
    })
})

app.post("/",function(req,res){
    const itemName = req.body.ele1;
    const todo4 = new item({
        name:itemName

    })
    todo4.save();
    res.redirect("/")
})

app.post("/delete",function(req,res){
    const checked = req.body.checkbox1;
    item.findByIdAndRemove(checked,function(err){
        if(!err){
            console.log("deleted");
            res.redirect("/");
        }
    })
})
app.listen(3000,function(){
    console.log("server started")
})









// const express =require('express');
// const bodyParser = require('body-parser');


// var app = express();
// app.use(express.static('public'));
// app.set("view engine", "ejs");
// app.use(express.urlencoded({extended:true}));
// var items = [];

// app.get("/",function(req,res){
//     res.render("list",{ejes:items})
// })

// app.post("/",function(req,res){
//     var item =req.body.ele1;
//     items.push(item);
//     res.redirect("/");
// })


// app.listen(3000,function(){
//     console.log("server started");
// })
