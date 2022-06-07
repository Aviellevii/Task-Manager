const express = require('express')
const app = express();
const cors = require('cors')
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const List = require('./model/list');
const Task =require('./model/task');
const User = require('./model/user');
const checkAuth = require('./middlewares/checkAuth');
app.use(bodyParser.json());

app.use(cors());

mongoose.connect(`mongodb+srv://${process.env.MONG_USERNAME}:${process.env.MONGO_PASSWORD}@avielnodejs.qrpj6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

mongoose.connection.on('connected', () => {
    console.log('mongoDB connected');
})

app.get('/lists',checkAuth,(req,res) => {
    List.find().then((lists)=>{
        res.send(lists)
    })
})

app.post('/lists',checkAuth,(req,res) => {
    const {title} = req.body;

    let newList = new List({
        title
    })
    newList.save().then((list)=>{
        res.send(list)
    })

})

app.patch('/lists/:id',checkAuth,(req,res)=>{
    List.findOneAndUpdate({_id:req.params.id},{$set:req.body}).then(()=>res.sendStatus(200))
})
app.delete('/lists/:id',checkAuth,(req,res) => {
    List.findOneAndRemove({_id:req.params.id}).then((listRemoved)=>{
        res.send(listRemoved);
        deleteTasksFromList(listRemoved._id);
    })
})



app.get('/lists/:id/tasks',checkAuth,(req,res) => {
    Task.find({_listId:req.params.id}).then((tasks) => {
        res.send(tasks)
    })
})
app.get('/lists/:id/tasks/:taskId',checkAuth,(req,res) => {
    Task.findOne({
        _id:req.params.taskId,
        _listId:req.params.id
    }).then((task) => {
        res.send(task)
    })
})
app.post('/lists/:id/tasks',checkAuth,(req,res) => {
    const {title} = req.body;
    
    let newTask = new Task({
        title,
        _listId:req.params.id
    })
    newTask.save().then((task) => {
        res.send(task)
    })
})

app.patch('/lists/:id/tasks/:taskId',checkAuth,(req,res) => {
    Task.findByIdAndUpdate({
        _id:req.params.taskId,
        _listId:req.params.id
    },{
        $set:req.body
    }).then(()=>{
        res.send({message:'Updated'});
    })
})

app.delete('/lists/:id/tasks/:taskId',checkAuth,(req,res) => {
    Task.findByIdAndRemove({
        _id:req.params.taskId,
        _listId:req.params.id
    }).then((taskDelete) => {
        res.send(taskDelete)
    })
})

app.post('/user/regiser',(req,res) =>{
    const {username,password} = req.body
    bcrypt.hash(password,10,(err,hash) => {
        const newUser = new User({
            username,
            password:hash
        })
        newUser.save().then((user)=>{
            console.log(user)
            res.send({message:'user Saved'})
        })
    })

})

app.post('/user/login',(req,res)=>{
    const {username,password} = req.body;
    User.find({username}).then((users)=>{
        if(users.length === 0){
            return res.status(401).json({
                message:'Auth Failed'
            })
        }
        const [user] = users;
        bcrypt.compare(password,user.password,(err,result) => {
            if(err){
                return res.status(401).json({
                    message:'Auth Failed'
                })
            }
            if(result){
                const token = jwt.sign({
                    _id:user._id,
                    username:user.username
                },
                    process.env.Key_JWT,
                    {
                        expiresIn:"1H"
                    })
                return res.status(200).json({
                    message:'Auth Success',
                    token,
                    user:{
                        id: user._id,
                        username:user.username
                    }
             })
            }
            res.status(401).json({
                message:'Auth Failed'
            })
        })
    })
})

let deleteTasksFromList = (_listId) =>{
    Task.deleteMany({
        _listId
    })
}
app.listen(3000,() => {
    console.log('listening on port 3000');
})