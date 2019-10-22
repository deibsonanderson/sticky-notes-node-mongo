'use strict';

const repository = require('../dao/note-dao');
const userRepository = require('../dao/user-dao');
const authService = require('../auth/auth-service');
var config = require('../config');

exports.find = async(req, res, next) => {
    try {
        var data = await repository.find();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to process your request of note'
        });
    }
}

exports.create = async(req, res, next) => {
    try {
        await repository.create(req.body);
        res.status(201).send({
            token: await this.refreshLogin(req),
            message: 'Note successfully registered'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Failed to process your request of note'
        });
    }
};

exports.update = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            token: await this.refreshLogin(req),
            message: 'Note updated successfully'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Failed to process your request of note'
        });
    }
};

exports.remove = async(req, res, next) => {
    try {
        await repository.remove(req.params.id)
        res.status(200).send({
            token: await this.refreshLogin(req),
            message: 'Note successfully removed'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Failed to process your request of note'
        });
    }
};

exports.refreshLogin = async(req) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);
        const user = await userRepository.findById(data.id);
        
        if (!user) {
            callback(new Error('invalid user'));
        }

        const newToken = await authService.generateToken({
            id: user._id,
            email: user.email,
            name: user.name,
            roles: user.roles
        });
        return newToken;
    } catch (e) {
        return callback(new Error(e.toString()));
    }
};