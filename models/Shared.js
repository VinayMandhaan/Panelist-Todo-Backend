const mongoose = require('mongoose')

const SharedSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = Shared = mongoose.model('shared', SharedSchema)