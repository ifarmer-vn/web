const nodemon = require("gulp-nodemon");

const jsWatcher = (done) => {
    const stream = nodemon({
        script: "server.js",
        ext: "js",
        ignore: [
            "assets/**/*.*",
            "gulp/**/*.*",
        ],
        tasks: [],
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

module.exports = jsWatcher;


