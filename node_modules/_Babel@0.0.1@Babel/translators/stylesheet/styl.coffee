Stylus = require("stylus")

module.exports = (source, callback) ->
	callback(null, Stylus(source).str)