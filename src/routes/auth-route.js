'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth-controller');
const authService = require('../auth/auth-service');

router.post('/login', controller.login);
router.post('/refresh-login', authService.authorize, controller.refreshLogin);

module.exports = router;