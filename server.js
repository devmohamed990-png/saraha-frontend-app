//Install express server
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
 
const app = express();
 
// Serve only the static files form the angularapp directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use('/', express.static(path.join(__dirname, 'dist' , 'saraha'))); 

app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'dist', 'saraha', 'index.html'));
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
