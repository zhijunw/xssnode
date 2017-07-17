Vows = require("vows")
assert = require("assert")
Babel = require("../src/babel")
Path = require("path")

TemplateTest = (file) ->
	
	topic: ->
		Babel.template(file, @callback)
		
	"produces the proper output": (err, template) ->
		throw err if err
	
		locals = local: "te"
		context = context: "st"
		
		output = template.call(context, locals)
			
		assert.equal(output.replace(/^\s+|\s+$/g,""), "testing")

Vows.describe("The Template Loader").addBatch(

	"An embedded coffeescript template": TemplateTest(
		Path.join(__dirname, "fixtures/template/test.eco")
	)
	
	"A jade template": TemplateTest(
		Path.join(__dirname, "fixtures/template/test.jade")
	)

).export(module)