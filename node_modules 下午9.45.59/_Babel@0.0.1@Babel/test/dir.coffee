Vows = require("vows")
Babel = require("../src/babel")
assert = require("assert")
Path = require("path")

DirTest = (dir, expected) ->

	topic: ->
		Babel.dir(dir, Babel.data, @callback)
	
	"returns correct result": (err, results) ->
		throw err if err
		assert.isObject(results)
		assert.deepEqual(results, expected)

Vows.describe("The Directory Loader").addBatch(

	"Loading every file in a dir": DirTest(
		Path.join(__dirname, "fixtures/dir/dir"),
		one: "one", two: "two", three: "three"
	)
			
	"Loading an empty dir": DirTest(
		Path.join(__dirname, "fixtures/dir/empty"),
		{}
	)
	
	"Loading a nonexistant dir": DirTest(
		Path.join(__dirname, "fixtures/dir/nonexistant"),
		{}
	)
		

).export(module)