'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    code: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: false,
        trim: true
    },
    description: {
        type: String,
        required: false
    },
    user: {
        type: String,
        required: false,
        trim: true
    },
    color: {
        type: String,
        required: false,
        trim: true
    },
    top: {
        type: Number,
        required: false        
    },
    left: {
        type: Number,
        required: false,
    },
    width: {
        type: Number,
        required: false,
    },
    height: {
        type: Number,
        required: false,
    },
    createDate: {
        type: Date,
        required: false,
        default: Date.now
    }
});

module.exports = mongoose.model('Note', schema);