// Dependencies
const http = require('http');


// App object

const app = {};

// Configuration
app.config = {
    port: 3000,
};

// Server Create

app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`listening to port ${app.config.port}`);
    });
};

app.handleReqRes = (req, res) => {
    res.end('Hello world');
}

// Start the server
app.createServer();