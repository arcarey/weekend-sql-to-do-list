const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('server/public'));

let taskRouter = require('./routes/taskRouter');
app.use('/tasks', taskRouter);

// our standard has been to run on local PORT 5000, but new apple has updated to use port 5000 for airplay
const PORT = 3500
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});