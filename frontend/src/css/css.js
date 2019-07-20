const fs = require("fs");

const getFileContent = path => {
	return fs.readFileSync(path, "utf8");
};

const revealed = {
	getFileContent
};

module.exports = revealed;
