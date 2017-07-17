Vows = require("vows")
assert = require("assert")
Babel = require("../src/babel")
Path = require("path")

DataTest = (file) ->

	topic: ->
		Babel.data(file, @callback)
		
	"returns the correct data": (err, data) ->
		throw err if err
		assert.deepEqual(data, { foo: "bar" })

Vows.describe("The Data Loader").addBatch(

	"Loading a JSON file": DataTest(
		Path.join(__dirname, "fixtures/data/test.json")
	)
	
	"Loading a coffee file": DataTest(
		Path.join(__dirname, "fixtures/data/test.coffee")
	)
	
).export(module)