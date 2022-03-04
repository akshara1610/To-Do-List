const express=require("express");
const bodyParser=require("body-parser");
const date=require(__dirname+"/date.js");

console.log(date());

const app=express();
var items=[];
var workItems=[];

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res)
{
   var day=date();
   res.render("list",{listTitle:day, newListItems: items});
});

app.post("/",function(req,res)
{
    var item=req.body.newItem;
    if(req.body.list==="Work")
    {
        workItems.push(item);
        res.redirect("/work");
    }
    else
    {
        items.push(item);
        res.redirect("/");
    }
    

    
})

app.get("/work",function(req,res)
{
    res.render("list",{listTitle:"Work",newListItems:workItems});
})

app.post("/work",function(req,res)
{
    var workItem=req.body.newItem;
    workItems.push(workItem);

    res.redirect("/work");
})

app.listen(3000);