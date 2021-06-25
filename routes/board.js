const express = require('express');
const boardController = require('../controllers/board');
const router = express.Router();

router.get('/board', boardController.getBoard)

router.get('/add-list', boardController.getAddList)

router.post('/add-list', boardController.postList)

router.post('/delete-list/:listId', boardController.postDeleteList)

router.get('/card-detail/:cardId', boardController.getCardDetail)

router.post('/add-card', boardController.postCard)

router.post('/edit-card', boardController.postEditCard)

router.post('/delete-card', boardController.postDeleteCard)

module.exports = router;