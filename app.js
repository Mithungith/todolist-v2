//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser:true})
const itemSchema = {
  name:String,
};
const Item = mongoose.model( "Item",itemSchema);
const Item1 = new Item({
   name: "welcome to your todolist"
});
const Item2 = new Item({
  name: "Hi Butterfly"
});
const Item3 = new Item({
  name: "Hello Dear"
});
const defaultItem = [Item1,Item2,Item3];



// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

app.get("/", function(req, res) {
Item.find({}, function(err,FoundItem){
  console.log("Hello");
  if (FoundItem.length === 0){
  Item.insertMany(defaultItem,function(err){
    if(err){
      console.log(err)
    }
    else {
       console.log("Successfully saved default item to DB.")
    }});
    res.redirect("/");
  }
  else{
    res.render("list", {listTitle: "Today1", newListItems: FoundItem});
  }
  });
});

app.post("/", function(req, res){

  const itemName = req.body.newItem;

  const item = new Item({
    name:itemName
  });

 item.save();
 res.redirect("/");
});

app.post("/delete", function(req,res){
  console.log("Delete")
  console.log(req.body);
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
