const mongoose = require('mongoose');

const ListSchema = mongoose.Schema({
    title: {type: String,required:true},

})
module.exports = mongoose.model('List',ListSchema);