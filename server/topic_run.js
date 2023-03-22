
const express = require("express");
const bodyParser = require("body-parser");
const {spawn} = require('child_process');
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require('cors');

const { PythonShell } = require("python-shell");

// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())






// app.get("/api", (req, res) => {
//     res.json({title: article})
// })

// // Route that receives a POST request to /api
// app.post('/api', function (req, res) {
//   const body = req.query
//   res.set('Content-Type', 'text/plain')
//   console.log(body)
// //   setArticle(article)
//   res.send(body)
  
// })







app.get('/api/:title', (req, res) => {
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

    

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

