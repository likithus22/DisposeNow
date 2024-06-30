const connectToMango = require("./db");
const express = require('express');
var cors = require('cors')
const WebSocket = require('ws');
const app = express();
const port = 5000;
// const { Server } = require("socket.io")

//definition of websocket server
const wss = new WebSocket.Server({ port: 5001 });


// Store all connected clients
const clients = new Set();

connectToMango();

app.use(cors())

app.use(express.json());
// available routs
const path1 = require('./routes/auth.js');
app.use('/api/auth', path1);

// const path2 = require('./routes/useroperation.js');
// app.use('/api/func',path2);
wss.on('connection', (ws) => {
    console.log("client connected")
    // WebSocket connection established
    ws.on('message', (message) => {
        // Handle incoming messages
        // console.log('Received message:', message.data);
        console.log('Parsed data:', JSON.parse(message));
    
        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
                console.log("message sent to");
            }
        });
    });
    ws.on("close",()=>{
        console.log("client has disconnected");
    })

});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
