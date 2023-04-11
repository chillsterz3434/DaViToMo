const express = require("express");
const bodyParser = require("body-parser");
const {spawn} = require('child_process');
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require('cors');
const { PythonShell } = 'python-shell'
const controller = new AbortController();
const signal = controller.signal;
require('dotenv').config();



const { MongoClient } = require('mongodb');
const uri = process.env.DB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = "DaViToMo";

async function run(mainPage){
    try{
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        const col = db.collection(mainPage);

        const query = {"_id": {"$exists": true}};
        const projection = {"text": 0};
        await col.find(query, projection)
            .toArray()
            .then(items => {
                console.log(`Successfully found ${items.length} documents.`)
                // items.forEach(console.log)
                items.map(doc => {
                    localArticles.push(doc.title)
                })
                return items
            })
    } catch (e){
        console.log(e.stack)
    } 
    finally{
        await client.close();
    }
}










// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


var localTopics = []
var localArticles = []
var localPrtdHeatmap = {}
var localPrwtHeatmap = {}
var localWordCloud = {}
var mainPage = ""




// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json( {limit: '5mb'} ));
app.use(cors())


// app.get('/api/articles', (req, res) => {
//     res.json({message: "Hello from server"})
// })


 app.get('/api/articles/:title', (req, res) => {
    mainPage = req.params.title;
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
        python.kill()
    });
});

app.post("/api/pytopics", (req, res) => {
    // Retrieve json data from post body
    var topics = req.body;
    localTopics.push(topics)
    // console.log(topics);
    res.json({result: "True"})
});

app.post("/api/pygraphs/prtdmap", (req, res) => {
    // Retrieve json data from post body
    localPrtdHeatmap = req.body;
    // console.log(req.body);
    res.json({result: "True"})
    
})
app.post("/api/pygraphs/prwtmap", (req, res) => {
    localPrwtHeatmap = req.body;
    // console.log(req.body);
    res.json({result: "True"})
})
app.post("/api/pygraphs/wordcloud", (req, res) => {
    localWordCloud = req.body;
    // console.log(req.body);
    res.json({result: "True"})
})

app.get("/api/topics", (req, res) => {
    res.send(localTopics);
})

app.get("/api/articles", (req, res) => {
    // res.send(run(mainPage).catch(console.dir))
    run(mainPage).catch(console.dir)
    res.send(localArticles)
})

app.get("/api/graphs/prtdmap", (req, res) => {
    res.send(localPrtdHeatmap);
})

app.get("/api/graphs/prwtmap", (req, res) => {
    res.send(localPrwtHeatmap);
})

app.get("/api/graphs/wordcloud", (req, res) => {
    res.send(localWordCloud);
})


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

