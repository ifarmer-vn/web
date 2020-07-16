const memcached = require("../memcached");
const utils = require("../src/utils");
const CacheView = function (opts) {
    let page = {};
    let self = this;
    const setView = (path, res) => {
        console.log("set View", path, res.length);
        page[path] = 1;
        memcached.add(path, res, 10, function (err) { /* stuff */
        });
    };
    this.middlewareStart = (req, res, next) => {
        let path = req.path;
        let view = page[path];
        if (view) {
            console.log("Existed", path);
            memcached.get(path, function (err, body) {
                if (!body) {
                    next();
                } else {
                    res.setHeader('Content-Length', Buffer.byteLength(body, 'utf-8'));
                    return res.end(body, 'utf-8');

                }
            });
            return;
        }
        next();
    };
    this.middlewareEnd1 = (req, res, next) => {
        let path = req.path;
        console.log("middlewareEnd", path);
        if (utils.isResourceRequest_(req)) {
            next();
            return;
        }
        let view = page[path];
        if (view) {
            memcached.get(path, function (err, data) {
                // console.log("found",data.length);
            });
            console.log("exist view", path)
            next();
            return;
        }

        if (res.statusCode > 400) {
            next();
            return;
        }
        if (path.includes(".js") || path.includes(".ico") || path.includes(".js")) {
            next();
            return;
        }
        let oldWrite = res.write,
            oldEnd = res.end;

        let chunks = [];
        console.log("middlewareEnd1", path);
        const originalEnd = res.end;
        const originalWrite = res.write;
        const originalWriteHead = res.writeHead;

        // We need to postpone writeHead, as it flushes the request headers to the client, and we
        // need to update the Content-Length with the size of the server side rendered AMP.
        res.writeHead = (statusCode, statusMessage, headers) => {
            res.status(statusCode);
            res.set(headers);
        };

        res.write = (chunk) => {
            chunks.push(chunk);
        };

        res.end = function (chunk) {
            res.write = originalWrite;
            res.end = originalEnd;
            res.writeHead = originalWriteHead;
            if (chunk) {
                // When an error (eg: 404) happens, express-static sends a string with
                // the error message on this chunk. If that's the case,
                // just pass forward the call to end.
                if (typeof chunk === 'string') {
                    res.end(chunk);
                    return;
                }
                chunks.push(chunk);
            }
            let body = Buffer.concat(chunks).toString('utf8');
            console.log(req.path, body.length);
            if (!view) {
                setView(path, body)
            }
            res.setHeader('Content-Length', Buffer.byteLength(body, 'utf-8'));
            res.end(body, 'utf-8');
        };

        next();
    };
};
module.exports = CacheView;

