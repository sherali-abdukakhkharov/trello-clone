const express = require('express');
const loginController = require('../controllers/login');
const router = express.Router();

// ============ REST API

// USERS
router.route('/users')
.get(loginController.getUsersInfo)
.delete(loginController.deleteUsers);

router.route('/users/:userId')
.get(loginController.getUserInfo)
.put(loginController.updateUser)
.delete(loginController.deleteUser);

router.route('/login')
.post(loginController.userLogin);

router.route('/signup')
.post(loginController.userSignUp);







// =========== ARCHIVED CODE

// router.get('/login', loginController.getLogin)

// router.get('/register', loginController.getRegister)

// router.post('/register', loginController.postRegister)

// router.post('/login', loginController.postLogin)

module.exports = router;
  