import { model, Schema, Types } from "mongoose";

export interface list{
    id:string;
    title:string;
    user:Types.ObjectId;
}

export const ListSchema = new Schema<list>({
    title:{type:String,required:true},
    user:{type:Schema.Types.ObjectId,required:true}
},{
    timestamps:true,
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    }
})

export const ListModel = model<list>('list',ListSchema);