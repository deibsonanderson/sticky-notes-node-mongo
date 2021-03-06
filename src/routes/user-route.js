'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/user-controller');
const authService = require('../auth/auth-service');

router.get('/', authService.authorize, controller.find);
router.post('/', authService.authorize, controller.create);
router.put('/:id', authService.authorize, controller.update);
router.delete('/', authService.authorize, controller.remove);

module.exports = router;