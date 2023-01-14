import { model, Schema } from "mongoose";

export interface user{
    id:string;
    username:string;
    password:string;
}

export const UserSchema = new Schema<user>({
    username:{type:String,required:true},
    password:{type:String,required:true}
},{
    timestamps:true,
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    }
})

export const UserModel = model<user>('user',UserSchema);