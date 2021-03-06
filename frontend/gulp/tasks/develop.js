// const {watch, series} = require("gulp");
const nodemon = require("gulp-nodemon");

const develop = (done) => {
	const stream = nodemon({
		script: "server.js",
		ext: "ejs js",
		ignore: [
			"assets/**/*.*",
			"gulp/**/*.*",
		],
		tasks: [
			// "reduceCSS",
			"css"
		],
		done: done
	});
	stream
		.on("restart", function () {
			console.log("restarted!");
		})
		.on("crash", function () {
			console.error("Application has crashed!\n");
			stream.emit("restart", 10)  // restart the server in 10 seconds
		});
};

module.exports = develop;


