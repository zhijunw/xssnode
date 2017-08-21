Jade = require("jade")

module.exports = (source, callback) ->
	callback(null, Jade.compile(source))