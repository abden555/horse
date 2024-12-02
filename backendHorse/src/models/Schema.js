const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema({
    horseWeights: {
        type: Number,
        required: true,
        trim:true
    },
    distance: {
        type: Number,
        required: true,
        trim:true
    },
    time: {
        type: String,
        required: true,
        trim:true
    },
    className: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "class",
        
    },
    horseName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "horse"
    },
}, { timestamps: true });

const CalculateTime = mongoose.model('CalculateTime', timeSchema);

module.exports = CalculateTime;
