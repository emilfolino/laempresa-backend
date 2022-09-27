require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const wines = require("./route/wines.js");
const auth = require("./route/auth.js");

const wineModel = require("./models/wines.js");

const app = express();
const httpServer = require("http").createServer(app);

const port = process.env.PORT || 8976;

app.use(cors());
app.options('*', cors());

app.disable('x-powered-by');

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/wines", wines);
app.use("/auth", auth);

app.get('/', (req, res) => {
    res.json({
        msg: "La empresa",
    });
});


const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.sockets.on('connection', function(socket) {
    console.log(socket.id); // Nått lång och slumpat

    socket.on("amounts", function(data) {
        socket.broadcast.emit("amounts", data);

        wineModel.updateAmounts(data);
    });
});


const server = httpServer.listen(port, () => {
    console.log('la empresa api listening on port ' + port);
});

module.exports = server;
