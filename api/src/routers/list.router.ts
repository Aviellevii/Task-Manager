import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import { list, ListModel } from '../models/list.model';
import { task, TaskModel } from '../models/task.model';
import auth from '../middleware/auth.mid'
const router = Router();
router.use(auth);
router.get('/',asyncHandler(
    async(req:any,res)=>{
        var lists = await ListModel.find({user:req.user.id});
        res.send(lists);
    }
))


router.get('/:id',asyncHandler(
    async(req:any,res)=>{
        const listId = req.params.id;
        const list = await ListModel.findOne({_id:listId,user:req.user.id});
        res.send(list);
    }
))

router.post('/',asyncHandler(
    async(req:any,res)=>{
       const {title} = req.body;
       const newlist:list ={
        id:'',
        title,
        user:req.user.id
       }
       const listdb = await ListModel.create(newlist);
       res.send(listdb);
    }
))

router.patch('/:id',asyncHandler(
    async(req:any,res)=>{
        const listId = req.params.id;
        const updatelist = await ListModel.findOneAndUpdate({_id:listId,user:req.user.id},{$set:req.body})
        res.send(updatelist); 
    }
))

router.delete('/:id',asyncHandler(
    async(req:any,res)=>{
        const listId = req.params.id;
        const list = await ListModel.findOneAndRemove({_id:listId,user:req.user.id})
        res.send(list); 
    }
))


router.get('/:listId/task',asyncHandler(
    async(req,res)=>{
        const listId = req.params.listId;
        const tasks = await TaskModel.find({_listId:listId})
        res.send(tasks);
    }
))
router.get('/:listId/task/:taskId',asyncHandler(
    async(req,res)=>{
        const listId = req.params.listId;
        const taskId = req.params.taskId;
        const task = await TaskModel.findOne({_id:taskId,_listId:listId})
        res.send(task);
    }
))

router.post('/:listId/task',asyncHandler(
    async(req,res)=>{
        const listId = req.params.listId
        const list = await ListModel.findById(listId);
       
        if(list){
            const {title} = req.body;
            const task:task ={
                id:'',
                title,
                _listId:list.id
            }
           
            const taskdb = await TaskModel.create(task);
            res.send(taskdb);
        }
    }
))

router.patch('/:listId/task/:taskId',asyncHandler(
    async(req,res)=>{
        const listId = req.params.listId;
        const taskId = req.params.taskId;
        const list = await ListModel.findById(listId)
        if(list){
            const updatetaskdb = await TaskModel.findOneAndUpdate({_id:taskId,_listId:list.id},{$set:req.body});
            res.send(updatetaskdb);
        }else res.sendStatus(404);
    }
))

router.delete('/:listId/task/:taskId',asyncHandler(
    async(req,res)=>{
        const listId = req.params.listId;
        const taskId = req.params.taskId;
        const list = await ListModel.findById(listId)
        if(list){
            const deletetaskdb = await TaskModel.findOneAndRemove({_id:taskId,_listId:list.id});
            res.send(deletetaskdb);
        }else res.sendStatus(404);
    }
))


export default router;

