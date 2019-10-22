'use strict';
const mongoose = require('mongoose');
const Note = mongoose.model('Note');

exports.find = async() => {
    const res = await Note.find();
    return res;
}

exports.create = async(data) => {
    var note = new Note(data);
    await note.save();
}

exports.update = async(id, data) => {
    var query = { code: id };
    
    await Note.findOneAndUpdate(query, {
        title: data.title,
        description: data.description,
        code: data.code,
        color: data.color,
        user: 1,
        top: data.top,
        left: data.left,
        width: data.width,
        height: data.height
    });
}

exports.remove = async(id) => {
    var query = { code: id };
    await Note
        .findOneAndRemove(query);
}