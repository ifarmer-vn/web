const fs = require("fs");

let css = {};

const getFileContent = path => {
	if(!css[path]){
		css[path]= fs.readFileSync(path, "utf8");
	}
	return css[path];
};

const revealed = {
	getFileContent
};

module.exports = revealed;
