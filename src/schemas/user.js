'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false
    },
    dateBirth: {
        type: Date,
        required: true,
        default: Date.now
    },
    email: {
        type: String,
        required: false
    },
    photo: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    site: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('User', schema);