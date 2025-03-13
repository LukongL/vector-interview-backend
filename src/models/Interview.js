const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 100,
    },
    description: { 
        type: String, 
        maxlength: 500,
    },
    questions: [{ 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 200,
    }],
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
    },
    createdAt: { 
        type: Date, 
        default: Date.now,
    },
});

module.exports = mongoose.model('Interview', interviewSchema);