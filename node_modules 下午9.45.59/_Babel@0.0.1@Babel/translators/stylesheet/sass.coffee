Sass = require("sass")

module.exports = (source, callback) ->
	Sass.render(source, callback)