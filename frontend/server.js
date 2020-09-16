require('events').EventEmitter.defaultMaxListeners = 100;
const express = require('express');
const utils = require('./src/utils');
const server = express();
const port = 3000;
const assets = require("./middewares/assets");
const routes = require("./middewares/routes");
// const passport = require('passport');
const cookieSession = require('cookie-session');
const AmpOptimizerMiddleware = require('amp-toolbox-optimizer-express');
// It's important that the AmpOptimizerMiddleware is added *before* the static middleware.
// This allows us to replace the parts needed before static handles the request.
server.use(AmpOptimizerMiddleware.create());
// const keys = require('./key');
// server.use(
//     cookieSession({
//         maxAge: 30 * 24 * 60 * 60 * 1000,
//         keys: [keys.cookieKey]
//     })
// );
// server.use(passport.initialize());
// server.use(passport.session());
// require("./passport");


//
// server.get('/auth/google/callback', passport.authenticate('google'));
// server.get('/api/current_user', (req, res) => {
//     console.log("req.user",req.user);
//     res.send(req.user);
// });
// server.get(
//     '/login/google',
//     passport.authenticate('google', {
//         scope: ['profile', 'email', 'phone']
//     })
// );
server.set('views', "resources");
server.set('view engine', 'ejs');

server.use(assets);

server.use(routes);

server.listen(port, () => console.log(`Ready on http://localhost:${port}!`));
