const express = require("express");
const bodyParser = require("body-parser");
const {spawn} = require('child_process');
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require('cors');
const { PythonShell } = 'python-shell'
const controller = new AbortController();
const signal = controller.signal;



// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())


app.get('/api/articles', (req, res) => {
    res.json({message: "Hello from server"})
})


 app.get('/api/articles/:title', (req, res) => {
    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn('python', ['topic.py', req.params.title]);
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
        
    });
});

app.post("/api/topics", (req, res) => {

    // Retrieve json data from post body
    var topics = req.body;
    console.log(topics);
    res.json({result: "True"})
});




app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

