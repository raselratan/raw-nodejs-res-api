const url = require('url');
const routes = require('../routes');
const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');
const handler = {};

handler.handleReqRes = (req, res) => {
    // request handle
    // get the url and parse that
    const parseURL = url.parse(req.url, true);
    const path = parseURL.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parseURL.query;
    const headerObject = req.headers;

    const requestProperties = {
        parseURL,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headerObject,
    };

    const choosenHnadler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

    choosenHnadler(requestProperties, (statusCode, payload) => {
        statusCode = typeof(statusCode) === 'number' ? statusCode : 500; 
        payload = typeof(payload) === 'object' ? payload : {}; 

        const payloadString = JSON.stringify(payload);

        res.writeHead(statusCode);
        res.end(payloadString);
    });

    console.log('method', method);
    console.log('trimmedpath', trimmedPath);
    console.log('queryStringObject', queryStringObject);
    console.log('headerObject', headerObject);  
};

module.exports = handler;