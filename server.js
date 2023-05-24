const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const hostname = "0.0.0.0";
const port = 3002;

server.listen(port, hostname, console.log(`Server running on port ${port}`));
