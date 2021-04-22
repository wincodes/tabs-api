const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TabsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dataPoints: {
        type: Array,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Tabs = mongoose.model('tabs', TabsSchema);

module.exports = Tabs;