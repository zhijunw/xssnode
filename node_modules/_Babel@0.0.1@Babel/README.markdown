# Babel

Babel puts a soft cushion between a web application and the many cool new 
file formats developed for use with node.js such as CoffeeScript, SASS, and 
Jade. With Babel, you will be able to seamlessly load from many different 
types of files without having to worry about the many APIs involved.

## Features

 + Easily load stylesheets, data, templates, and scripts from many popular formats
 + Never worry about format lock-in
 + Experiment with different formats with ease

## Installation

To install babel, use npm

	npm install babel
	
Then Babel can easily be included into any node.js project

	Babel = require("babel");

## Methods

### Babel.template(file, callback)

Load and convert a template file into a JavaScript function.

A template is a snippet of HTML which can be used many times with different
values.

`file` is an absolute path to the template file and `callback` is a function 
which will be called as `callback(err, template)` after the file is loaded
and converted. 

The `template` function returned to `callback` can be used to render the 
template with a `values` object and a `context` object by calling
`template.call(context, values)`.

#### Example

If you had a embedded CoffeeScript file

	<h1><%= @greeting %> <%= planet %></h1>
	
you could load it with

	Babyl.template("hello.eco", function(err, render) {
		// ...
	});
	
and then render it with

	var context = { greeting: "Hello" };
	var values = { planet: "world" };

	var output = render.call(context, values);
	
Now, `output` will equal `<h1>hello world</h1>`

#### Supported Formats

 + [Jade Templates](https://github.com/visionmedia/jade) (*.jade)
 + [Embedded Coffeescript](https://github.com/sstephenson/eco) (*.eco)

### Babel.data(file, callback)

Load and convert a data file into a JavaScript object

A data file contains a serialized JavaScript object. Since these files are
static (you cannot easily write to them) they are typically used for storing
settings or unchanging data.

`file` is an absolute path to the data file and `callback` is a function 
which will be invoked as `callback(err, data)` after the data is loaded and
converted. 

The `data` object returned to `callback` is a JavaScript object.

#### Example

If you had a JSON file

	{
		"username": "root",
		"password": "asdf"
	}
	
you could load it with

	Babyl.data("accounts.json", function(err, data) {
		// ...
	});
	
now `data` will equal `{ username: "root", "password": "asdf" }`

#### Supported Formats

 + [Coffee Script](http://jashkenas.github.com/coffee-script/) (*.coffee)
 + JSON (*.json)

### Babel.script(file, callback)

Load and convert a script into a JavaScript function.

A script is a file containing code. This code is compiled into a JavaScript
function which can be run multiple times with different values and contexts.

`file` is an absolute path to the script and `callback` is a function 
which will be invoked as `callback(err, script)`. 

The `script` function returned to `callback` can be used to run the 
script with a `values` object and a `context` object by calling
`script.call(context, values)`.

#### Example

If you had a CoffeeScript file

	x for x in [@min..max] by 2

you could load it with

	Babyl.data("evens.coffee", function(err, script) {
		// ...
	});

and run the script with

	var evens = script.call({ min: 0 }, { max: 10 });
	
now `evens` will equal `[ 0, 2, 4, 6, 8, 10 ]`

#### Supported Formats

 + JavaScript (*.js)
 + CoffeeScript (*.coffee)

### Babel.stylesheet(file, callback)

Load a convert a stylesheet into a string of CSS rules.

A stylesheet is any file that defines the visual appearance of a HTML document
that can be translated into CSS.

`file` is an absolute path to the stylesheet file and `callback` is a function 
which will be invoked as `callback(err, css)`. 

The `css` string contains valid CSS rules ready to be inserted into the document

#### Example

If you had a LESS stylesheet

	.blog-post {
		h2 { color: red; }
	}
	
you could load it with

	Babyl.data("blog.scss", function(err, css) {
		// ...
	});
	
now `css` will equal `".blog-post h2 { color: red }"`

#### Supported Formats

 + CSS (*.css)
 + LESS (*.less)
 + SCSS (*.scss)
 + Stylus (*.styl)

### Babel.dir(dir, iterator, callback)

Load all files in a directory in one step.

Call `iterator` for each file in `dir` as `iterator(file, callback)`. 
The iterator can then asynchronously load the file and call `callback` 
with the result. *(note: this is not the same `callback` as is passed to 
`Babel.dir`)*. All results are gathered into a JavaScript object as 
`{ <file basename>: <result>, ... }` and passed to `callback`

This method works very well with all Babel load methods -- just use them as 
the iterator

	Babel.dir(dir, Babel.template, function(err, templates) { ... }

#### Example

If you you have a folder full of templates

	stylesheets/
		body.html
		post.jade
		header.eco
		footer.ejs
		
you can load all templates in one step with

	Babel.dir(dir, Babel.template, function(err, templates) {
		// ...
	});

`templates` will equal

	{
		body: function(values) { ... },
		post: function(values) { ... },
		header: function(values) { ... },
		footer: function(values) { ... }
	}

## Creating Translators

Translators contain the instructions for converting a specific file type 
(defined by the file extension) into a standardized data structure.

A translator is function invoked by Babel as `translator(source, callback)`, 
where `source` is the raw contents of the file being translated. This function 
is run asynchronously to convert the source into a data structure (as defined
per file type in the sections below).

Translators are located at `./translators/<type>/<extension>.coffee` where 
`<extension>` refers to the file extension a file of that type would have. For
example, the JSON data translator is located at `translators/data/json.coffee`.
The translator function should be placed into `module.exports`.

### Data

Data translators should return a JavaScript object representation of the source.

### Script

A script translator returns a function of the signature `script(values)`.
 
`values` is an object to be used as the local scope when running the 
script (presumably inside a `with(values) { ... }` block). This function
should also support being run as `script.call(context, values)`. 

Values returned in the script's execution by `return` statements should be 
returned from the `script(values)` function.

### Stylesheet

A stylesheet translator should return a string of W3C valid CSS rules.

### Template

A template translator should return a function of the signature `render(values)`

`values` is an object to be used as the local scope when rendering the 
template (presumably inside a `with(values) { ... }` block). This function
should also support being run as `template.call(context, values)`.

The template should still work after being passed through `template.toString()`