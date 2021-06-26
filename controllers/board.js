const Card = require("../models/card");
const List = require("../models/list");
const { QueryTypes, json } = require("sequelize");

// ========== RESTful API Controller

// ============ LISTS
exports.getLists = (req, res, next) => {
  List.findAll()
    .then((lists) => {
      res.send(lists);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

exports.postList = (req, res, next) => {
    List.bulkCreate([req.body])
    .then((result) => {
      res.send("List(s) has been Added!");
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

exports.deleteLists = (req, res, next) => {
  List.destroy({
    where: {},
  })
    .then((result) => {
      res.send("All lists has been deleted!");
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

exports.getList = (req, res, next) => {
  const listId = req.params.listId;
  List.findByPk(listId)
    .then((list) => {
      res.send(list);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

exports.updateList = (req, res, next) => {
  const listId = req.params.listId;
  const updatedListTitle = req.body.title;

  List.findByPk(listId)
    .then((list) => {
      list.title = updatedListTitle;
      return list.save();
    })
    .then((result) => {
      res.send("All changes has been saved!");
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

exports.deleteList = (req, res, next) => {
    const listId = req.params.listId;

    List.findByPk(listId)
    .then(list => {
        return list.destroy();
    })
    .then(result => {
        res.send("List has been deleted!")
    })
    .catch(err => {
        console.log(err);
        res.send(err);
    })
}

// ================= CARDS
exports.getCards = (req, res, next) => {
    Card.findAll()
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
}

exports.postCard = (req, res, next) => {

    Card.bulkCreate([req.body])
    .then((result) => {
      res.send("Card(s) has been Added!");
    })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  };

  exports.deleteCards = (req, res, next) => {
    Card.destroy({
      where: {},
    })
      .then((result) => {
        res.send("All cards has been deleted!");
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  };

  exports.getCard = (req, res, next) => {
    const cardId = req.params.cardId;
    Card.findByPk(cardId)
      .then((card) => {
        res.send(card);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  };


exports.updateCard = (req, res, next) => {
    const cardId = req.params.cardId;
    const updatedCardTitle = req.body.title;
    const updatedCardDesc = req.body.description;
  
    Card.findByPk(cardId)
      .then((card) => {
        card.title = updatedCardTitle;
        card.description = updatedCardDesc;
        return card.save();
      })
      .then((result) => {
        res.send("All changes has been saved!");
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  };

  exports.deleteCard = (req, res, next) => {
    const cardId = req.params.cardId;

    Card.findByPk(cardId)
    .then(card => {
        return card.destroy();
    })
    .then(result => {
        res.send("Card has been deleted!")
    })
    .catch(err => {
        console.log(err);
        res.send(err);
    })
}

// ARCHIVED CODE

exports.postDeleteList = (req, res, next) => {
  const listId = req.params.listId;
  List.findByPk(listId)
    .then((list) => {
      return list.destroy();
    })
    .then((result) => {
      console.log("List Deleted!");
      res.redirect("/board");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteCard = (req, res, next) => {
  const cardId = req.body.cardId;

  Card.findByPk(cardId)
    .then((card) => {
      return card.destroy();
    })
    .then((result) => {
      console.log("Card Deleted!");
      res.redirect("/board");
    })
    .catch((err) => console.log(err));
};

exports.postEditCard = (req, res, next) => {
  const cardId = req.body.cardId;
  const updatedCardTitle = req.body.cardTitle;
  const updatedCardDesc = req.body.cardDesc;

  Card.findByPk(cardId)
    .then((card) => {
      card.title = updatedCardTitle,
      card.description = updatedCardDesc;
      return card.save();
    })
    .then((result) => {
      console.log("All changes has been saved!");
      res.redirect("/board");
    })
    .catch((err) => console.log(err));
};

exports.getCardDetail = (req, res, next) => {
  const cardId = req.params.cardId;
  Card.findByPk(cardId).then((card) => {
    res.render("board/card-detail", {
      card: card,
    });
  });
};

exports.getAddList = (req, res, next) => {
  Card.findAll()
    .then((cards) => {
      List.findAll()
        .then((lists) => {
          var data = {
            lists: lists,
            cards: cards,
          };
          console.log(JSON.stringify(data));
          res.render("board/add-list", {
            data: data,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.postAddList = (req, res, next) => {
  const listName = req.body.listName;
  List.create({
    title: listName,
  })
    .then((result) => {
      console.log("List Added!");
      res.redirect("/board");
    })
    .catch((err) => console.log(err));
};

exports.postAddCard = (req, res, next) => {
  const cardName = req.body.cardName;
  const listId = req.body.listId;
  Card.create({
    title: cardName,
    listId: listId,
  })
    .then((result) => {
      console.log("Card added!");
      res.redirect("/board");
    })
    .catch((err) => console.log(err));
};

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

  Card.findAll()
    .then((cards) => {
      List.findAll()
        .then((lists) => {
          var data = {
            lists: lists,
            cards: cards,
          };
          console.log(JSON.stringify(data));
          res.render("board/board", {
            data: data,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

