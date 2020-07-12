const { createServer } = require("http");
const PORT = 5000;
const handleServer = require("./api/index");
const handleListen = () => console.log(`Listening on ${PORT}...`);
createServer(handleServer).listen(PORT, handleListen);
