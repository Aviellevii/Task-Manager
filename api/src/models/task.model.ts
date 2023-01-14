import { model, Schema, Types } from "mongoose";

export interface task{
    id:string;
    title:string;
    _listId:Types.ObjectId;
}

export const TaskSchema = new Schema<task>({
    title:{type:String,required:true},
    _listId:{type:Schema.Types.ObjectId,required:true}
},{
    timestamps:true,
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    }
})

export const TaskModel = model<task>('task',TaskSchema);