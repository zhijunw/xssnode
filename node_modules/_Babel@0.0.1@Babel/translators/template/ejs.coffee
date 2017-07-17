Ejs = require("ejs")

module.exports = (source, callback) ->
	callback(null, Ejs.compile(source))