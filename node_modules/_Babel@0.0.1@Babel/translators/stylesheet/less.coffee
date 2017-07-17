Less = require("less")

module.exports = (source, callback) ->
	Less.render(source, callback)