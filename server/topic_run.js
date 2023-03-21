// server/index.js

const express = require("express");
const {spawn} = require('child_process');


const PORT = process.env.PORT || 5000;

const app = express();

const { PythonShell } = require("python-shell");



app.get('/api', (req, res) => {

    // res.json({ message: "Hello from server!" });

    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn('python', ['topic.py', 'Morty_Smith']);
    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });
    // in close even we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send({script: {dataToSend}})
        res.end();
    });
    
    
});

    

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});