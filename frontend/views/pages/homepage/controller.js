const pug = require('pug');
const {resolve} = require("path");
const compiledFunction = pug.compileFile(resolve("views/pages/homepage/views/view.pug"));
const controller = (req, res) => {
	return res.send(compiledFunction({
		name: 'Timothy'
	}));
};

module.exports = controller;