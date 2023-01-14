import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { user, UserModel } from '../models/user.model';
const router = Router();


router.post('/register',asyncHandler(
    async(req,res)=>{
        const {username,password} = req.body;
        if(await UserModel.findOne({username})){
            res.send('User Already exist');
            return
        }
        const passwordHash =await bcryptjs.hash(password,10);
        const user:user = {
            id:'',
            username,
            password:passwordHash
        } 
        const userdb = await UserModel.create(user);
        res.send(GenerateToken(userdb));
    }
))

router.post('/login',asyncHandler(
    async(req,res)=>{
        const {username,password} = req.body;
        const user = await UserModel.findOne({username})
        if(user && (await bcryptjs.compare(password,user.password)))
        res.send(GenerateToken(user));
        else res.send('username or password invalid');

    }
))


const GenerateToken = (user:user) => {
    const token = jwt.sign({
        id:user.id,username:user.username
    },process.env.Secret_Key!,{expiresIn:'10d'});

    return {
        id:user.id,
        username:user.username,
        token
    }
}

export default router;