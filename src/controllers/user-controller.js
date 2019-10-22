'use strict';

const repository = require('../dao/user-dao');
const md5 = require('md5');
var config = require('../config');

exports.find = async(req, res, next) => {
    try {
        var data = await repository.find();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to process your request of user'
        });
    }
}

exports.create = async(req, res, next) => {
    try {

        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.PRIVATE_KEY)
        });
        res.status(201).send({
            message: 'User successfully registered'
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Failed to process your request of user'
        });
    }
};

exports.update = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'User updated successfully'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Failed to process your request of user'
        });
    }
};

exports.remove = async(req, res, next) => {
    try {
        await repository.remove(req.body.id)
        res.status(200).send({
            message: 'User successfully removed'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Failed to process your request of user'
        });
    }
};
