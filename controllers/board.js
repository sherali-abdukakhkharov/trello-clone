const Card = require("../models/card");
const List = require('../models/list');
const { QueryTypes } = require('sequelize');

exports.postDeleteList = (req, res, next) => {
    const listId = req.params.listId;
    List.findByPk(listId)
        .then(list => {
            return list.destroy()
        })
        .then(result => {
            console.log("List Deleted!")
            res.redirect('/board')
        })
        .catch(err => console.log(err))
}

exports.postDeleteCard = (req, res, next) => {
    const cardId = req.body.cardId;

    Card.findByPk(cardId)
        .then(card => {
            return card.destroy()
        })
        .then(result => {
            console.log("Card Deleted!");
            res.redirect('/board');
        })
        .catch(err => console.log(err))
}

exports.postEditCard = (req, res, next) => {
    const cardId = req.body.cardId;
    const updatedCardTitle = req.body.cardTitle;
    const updatedCardDesc = req.body.cardDesc;

    Card.findByPk(cardId)
        .then(card => {
            card.title = updatedCardTitle,
            card.description = updatedCardDesc
            return card.save()
        })
        .then(result => {
            console.log("All changes has been saved!")
            res.redirect('/board');
        })
        .catch(err => console.log(err))
}

exports.getCardDetail  = (req, res, next) => {
    const cardId = req.params.cardId;
    Card.findByPk(cardId)
    .then(card => {
        res.render('board/card-detail', {
            card: card
        })
    })
}

exports.getAddList = (req, res, next) => {
    Card.findAll().then(cards => {
        List.findAll().then(lists => {
            var data = {
                lists: lists,
                cards: cards
            }
            console.log(JSON.stringify(data))
            res.render('board/add-list', {
                data: data
            })
        })
        .catch(err=> console.log(err))
    })
    .catch(err=> console.log(err))
}

exports.postList = (req, res, next) => {
    const listName = req.body.listName;
    List.create({
        title: listName
    })
    .then(result => {
        console.log('List Added!');
        res.redirect('/board');
    })
    .catch(err => console.log(err))
}

exports.postCard = (req, res, next) => {
    const cardName = req.body.cardName;
    const listId = req.body.listId
    Card.create({
        title: cardName,
        listId: listId
    })
    .then(result => {
        console.log('Card added!');
        res.redirect('/board');
    })
    .catch(err => console.log(err))
}

exports.getBoard = (req, res, next) => {
    // sequelize.query(
    //     "SELECT card.id, card.title, card.description, list.title as 'listName' FROM `cards` card JOIN `lists` list on card.listId = list.id", 
    //     { type: QueryTypes.SELECT }
    // ).then(rows => {
    //     res.render("board/board", {
    //         boards: JSON.parse(rows)
    //     })
    // })
    // res.render("board/board", {
    //     boards: [
    //         {
    //             title: "Card 1",
    //             listName: "Tasks"
    //         },
    //         {
    //             title: "Card 2",
    //             listName: "Going"
    //         }
    //     ]
    // })
    // Card.findAll({
    //     includes: [{
    //         model: List,
    //         as: "listName"
    //     }]
    // })        
    // .then(board => {
    //     res.render('board/board', {
    //         boards: board
    //     })
    //     result = JSON.stringify(board)
    //     console.log(result);
    // })

    Card.findAll().then(cards => {
        List.findAll().then(lists => {
            var data = {
                lists: lists,
                cards: cards
            }
            console.log(JSON.stringify(data))
            res.render('board/board', {
                data: data
            })
        })
        .catch(err=> console.log(err))
    })
    .catch(err=> console.log(err))
}