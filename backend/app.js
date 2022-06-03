const express = require('express')
const app = express();
const cors = require('cors')

const bodyParser = require('body-parser')

const mongoose = require('mongoose');
const List = require('./model/list');
const Task =require('./model/task');
app.use(bodyParser.json());

app.use(cors());

mongoose.connect(`mongodb+srv://${process.env.MONG_USERNAME}:${process.env.MONGO_PASSWORD}@avielnodejs.qrpj6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

mongoose.connection.on('connected', () => {
    console.log('mongoDB connected');
})

app.get('/lists',(req,res) => {
    List.find().then((lists)=>{
        res.send(lists)
    })
})

app.post('/lists',(req,res) => {
    const {title} = req.body;

    let newList = new List({
        title
    })
    newList.save().then((list)=>{
        res.send(list)
    })

})

app.patch('/lists/:id',(req,res)=>{
    List.findOneAndUpdate({_id:req.params.id},{$set:req.body}).then(()=>res.sendStatus(200))
})
app.delete('/lists/:id',(req,res) => {
    List.findOneAndRemove({_id:req.params.id}).then((listRemoved)=>{
        res.send(listRemoved)
    })
})



app.get('/lists/:id/tasks',(req,res) => {
    Task.find({_listId:req.params.id}).then((tasks) => {
        res.send(tasks)
    })
})
app.get('/lists/:id/tasks/:taskId',(req,res) => {
    Task.findOne({
        _id:req.params.taskId,
        _listId:req.params.id
    }).then((task) => {
        res.send(task)
    })
})
app.post('/lists/:id/tasks',(req,res) => {
    const {title} = req.body;
    
    let newTask = new Task({
        title,
        _listId:req.params.id
    })
    newTask.save().then((task) => {
        res.send(task)
    })
})

app.patch('/lists/:id/tasks/:taskId',(req,res) => {
    Task.findByIdAndUpdate({
        _id:req.params.taskId,
        _listId:req.params.id
    },{
        $set:req.body
    }).then(()=>{
        res.send({message:'Updated'});
    })
})

app.delete('/lists/:id/tasks/:taskId',(req,res) => {
    Task.findByIdAndRemove({
        _id:req.params.taskId,
        _listId:req.params.id
    }).then((taskDelete) => {
        res.send(taskDelete)
    })
})
app.listen(3000,() => {
    console.log('listening on port 3000');
})