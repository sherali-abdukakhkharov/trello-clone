const express = require('express');
const loginController = require('../controllers/login');
const router = express.Router();

router.get('/login', loginController.getLogin)

router.get('/register', loginController.getRegister)

router.post('/register', loginController.postRegister)

router.post('/login', loginController.postLogin)

module.exports = router;
  