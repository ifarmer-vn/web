let router = require('express').Router();
let globule = require('globule');
const routes = (typeRoute=>{
    typeRoute.map(file => {
        console.log("file", file);
        router.use(require(file));
    });
});
let pageRoutes = globule.find('./resources/pages/*/route.js', {absolute: true});
let apiRoutes = globule.find('./resources/api/*/route.js', {absolute: true});
routes(apiRoutes);
routes(pageRoutes);

router.use(require("../resources/pages/plp/fallback-route"));

module.exports = router;
