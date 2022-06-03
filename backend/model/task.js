const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    _listId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    Complete:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('Task',TaskSchema);