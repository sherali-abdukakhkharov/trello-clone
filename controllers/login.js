const User = require('../models/user');
const Card = require('../models/card');
const List = require('../models/list');
const router = require('../routes/board');

exports.getLogin = (req, res, next) => {
    res.render('login/login')
}

exports.getRegister = (req, res, next) => {
    res.render('login/register')
}

exports.postRegister = (req, res, next) => {
    const newUserEmail = req.body.username
    const newUserPass = req.body.password
    User.create({
        email: newUserEmail,
        password: newUserPass
    })
    .then(result => {
        console.log('User added!');
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
    })
    .catch(err => console.log(err))
}

exports.postLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findAll({ where: { email: username } })
        .then(user => {
            for(let i=0; i< user.length+1; i++) {
                if (user[i].password === password) {
                    Card.findAll().then(cards => {
                        List.findAll().then(lists => {
                            var data = {
                                lists: lists,
                                cards: cards,
                            }
                            console.log(req.user)
                            console.log(data)
                            res.render('board/board', {
                                data: data
                            })
                        })
                        .catch(err=> console.log(err))
                    })
                    .catch(err=> console.log(err))
                }
            }
            return user;
        })
        .then(result => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
}