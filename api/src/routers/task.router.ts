import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import { ListModel } from '../models/list.model';
import { task, TaskModel } from '../models/task.model';
const router = Router();

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
        const task = await TaskModel.findById({id:taskId,_listId:listId})
        res.send(task);
    }
))

router.post('/:listId/task',asyncHandler(
    async(req,res)=>{
        const listId = req.params.listId
        const list = await ListModel.findById(listId);
        console.log(list);
        if(list){
            const {title} = req.body;
            const task:task ={
                id:'',
                title,
                _listId:list.id
            }
            console.log(task);
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
            const updatetaskdb = await TaskModel.findByIdAndUpdate({id:taskId,_listId:list.id},{$set:req.body});
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
            const deletetaskdb = await TaskModel.findByIdAndRemove({id:taskId,_listId:list.id});
            res.send(deletetaskdb);
        }else res.sendStatus(404);
    }
))

export default router;