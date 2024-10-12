const fs=require("fs");
const express=require("express");
const parser = require('simple-excel-to-json');
const path = require("path");
const multer=require('multer');

const router=require("./router/routes");

const app=express();

app.set('view engine','ejs');

app.use(express.static(path.resolve("./views")));
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.get('/download',(req,res)=>{
   res.render("download")
})
app.post('/down',(req,res)=>{
   res.download(path.resolve("./views/assets/contact.csv"));
})

app.use('/',router);

app.listen(80,()=>{console.log("server started...")});

