const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
    },
    status: {
        type: Boolean,
        default:false
    },
    dueDate: {
        type: Date
    },
    description: {
        type: String
    },
    reminder: {
        type: Boolean,
        default:false
    }
})

module.exports = Task = mongoose.model('task', TaskSchema)