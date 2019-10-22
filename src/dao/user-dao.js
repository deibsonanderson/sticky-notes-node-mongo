'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.find = async() => {
    const res = await User.find({
        active: true
    }, 'title price slug');
    return res;
}

exports.findById = async(id) => {
    const res = await User.findById(id);
    return res;
}

exports.create = async(data) => {
    var user = new User(data);
    await user.save();
}

exports.update = async(id, data) => {
    await User
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price,
                slug: data.slug
            }
        });
}

exports.remove = async(id) => {
    await User
        .findOneAndRemove(id);
}

exports.login = async(data) => {
    const res = await User.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}