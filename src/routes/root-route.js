'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res, next) => {
	res.sendFile(__dirname+'/page/index.html');
});

router.get('/page', (req, res, next) => {
    res.sendFile(__dirname+'/page/index.html');
});

module.exports = router;