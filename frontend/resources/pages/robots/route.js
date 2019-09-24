const router = require('express').Router();
const globule = require('globule');
const files = globule.find('./resources/pages/robots/*');
console.log(files);
files.map(file => {
    const arr = file.split('/');
    const fileName = arr[arr.length - 1];
	console.log("sitemap", fileName);
    router.get('/' + fileName, function (req, res) {
        res.sendFile(__dirname + "/" + fileName);
    });
});

module.exports = router;
