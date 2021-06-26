const express = require('express');
const boardController = require('../controllers/board');
const router = express.Router();


///////// RESTful API

// LISTS
router.route('/lists')
.get(boardController.getLists)
.post(boardController.postList)
.delete(boardController.deleteLists);

router.route('/lists/:listId')
.get(boardController.getList)
.put(boardController.updateList)
.delete(boardController.deleteList);

// CARDS
router.route('/cards')
.get(boardController.getCards)
.post(boardController.postCard)
.delete(boardController.deleteCards);

router.route('/cards/:cardId')
.get(boardController.getCard)
.put(boardController.updateCard)
.delete(boardController.deleteCard);





// ========= ARCHIVED CODE

router.get('/board', boardController.getBoard)

router.get('/add-list', boardController.getAddList)

router.post('/add-list', boardController.postAddList)

router.post('/delete-list/:listId', boardController.postDeleteList)

router.get('/card-detail/:cardId', boardController.getCardDetail)

router.post('/add-card', boardController.postAddCard)

router.post('/edit-card', boardController.postEditCard)

router.post('/delete-card', boardController.postDeleteCard)


module.exports = router;