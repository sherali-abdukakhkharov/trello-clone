exports.get404 = (req, res, next) => {
    res.status(404).send('<html><h1>Page not found!</h1></html>')
};