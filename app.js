const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Card = require("./models/card");
const List = require("./models/list");

const app = express();


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const boardRoutes = require("./routes/board");
const loginRoutes = require("./routes/login");
const User = require("./models/user");

app.use(loginRoutes);
app.use(boardRoutes);

app.use('/', (req, res) => {
    res.render('home');
})

app.use(errorController.get404);

Card.belongsTo(List, { constraints: true, onDelete: "CASCADE" });
List.hasMany(Card);
List.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(List);

sequelize
.sync()
.then(result => {
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
      });
})
.catch(err => console.log(err))





