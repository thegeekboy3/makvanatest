const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const logging = require('./structs/logging')
const config = require('./config')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("etag", false);
//app.use("/", express.static("public"));

app.get('/', (req, res) => {
	res.send("Server is Online :)")
})

fs.readdirSync(`${__dirname}/Services`).forEach(route => {
	require(`${__dirname}/Services/${route}`)(app);
})

app.listen(config.port, () => {
	logging.stars(`Started On Port ${config.port}`)
})

module.exports = app;