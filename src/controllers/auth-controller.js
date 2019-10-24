'use strict';

const repository = require('../dao/user-dao');
const authService = require('../auth/auth-service');
const md5 = require('md5');
var config = require('../config');

exports.login = async(req, res, next) => {
    try {
        
        const user = await repository.login({
            email: req.body.email,
            password: md5(req.body.password + global.PRIVATE_KEY),
            roles: ["user"]
        });
        if (!user) {
            res.status(404).send({
                message: 'username or password is invalid'
            });
            return;
        }

        const token = await authService.generateToken({
            id: user._id,
            email: user.email,
            name: user.name
        });
        res.status(201).send({
            token: token,
            user: {
                email: user.email,
                name: user.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Failed to process of login your request of auth'
        });
    }
};

exports.refreshLogin = async(req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);
        
        const user = await repository.findById(data.id);
        
        if (!user) {
            res.status(404).send({
                message: 'user not found'
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: user._id,
            email: user.email,
            name: user.name,
            roles: user.roles
        });
        
        res.status(201).send({
            token: tokenData,
            data: {
                email: user.email,
                name: user.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Failed to process of refreshLogin your request of auth'
        });
    }
};
