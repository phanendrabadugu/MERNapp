const express = require("express");
const mongoose = require("mongoose");
const TaskSchema = require("./schema");
const cors = require("cors");

const app = express();

app.use(express.json())

app.use(cors({
    origin: '*'
}))

mongoose.connect("mongodb+srv://Phanendra:Phanendra@cluster0.nmqsu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
     {useUnifiedTopology: true,
     useNewUrlParser: true}).then(
    () => console.log("DB Connected.........")).catch(
        (err) => console.log(err));


app.post("/addtask", async(req, res)=>{
   const {todo} = req.body;
   try{
           const newData = new TaskSchema({
               todo : todo
           });
           await newData.save();
           return res.json(await TaskSchema.find())
   }
   catch(err){
       console.log(err)
   }
})
    
//get

app.get("/gettask", async(req,res)=>{
    try{
          return res.json(await TaskSchema.find());
    }
    catch(err){
        console.log(err)
    }
})

//Delete


app.delete("/delete/:id", async(req,res)=>{
    try{
        await TaskSchema.findByIdAndDelete(req.params.id)
          return res.json(await TaskSchema.find());
    }
    catch(err){
        console.log(err)
    }
})


app.listen(9000, () => console.log("SERVER IS RUNNING..........."));
