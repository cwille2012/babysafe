import * as path from 'path';
import * as express from 'express';

const app = express();

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzgzMjc5MDcsImlhdCI6MTUzODMyNjEwNywiaXNzIjoiNWJiMGZlNWJiNGE1YzU1ZmE0Y2JmNWQ1Iiwic3RpdGNoX2RhdGEiOm51bGwsInN0aXRjaF9kZXZJZCI6IjViYjBmZTViYjRhNWM1NWZhNGNiZjVkNCIsInN0aXRjaF9kb21haW5JZCI6IjViOTdkM2FhMGUxMTkwZjg2YmUyMjIzOCIsInN1YiI6IjViOTdlY2IzYTY2ZTY3ZGY0N2QzYWM2YiIsInR5cCI6ImFjY2VzcyJ9.mUBy6XuYenGloGxakkcIYq8xfU34QWU4Sdic8wgv1Co

const auth: express.Handler = (req, res, next) => {
    console.log('Checking Authorization');
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send('Error: Authentication not provided');
    } else {
        if (token == 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzgzMjc5MDcsImlhdCI6MTUzODMyNjEwNywiaXNzIjoiNWJiMGZlNWJiNGE1YzU1ZmE0Y2JmNWQ1Iiwic3RpdGNoX2RhdGEiOm51bGwsInN0aXRjaF9kZXZJZCI6IjViYjBmZTViYjRhNWM1NWZhNGNiZjVkNCIsInN0aXRjaF9kb21haW5JZCI6IjViOTdkM2FhMGUxMTkwZjg2YmUyMjIzOCIsInN1YiI6IjViOTdlY2IzYTY2ZTY3ZGY0N2QzYWM2YiIsInR5cCI6ImFjY2VzcyJ9.mUBy6XuYenGloGxakkcIYq8xfU34QWU4Sdic8wgv1Co') {
            next();
        } else {
            return res.status(401).send('Error: Invalid authorization token');
        }
    }
}

const cors = require('cors');
const compress = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const validate = require('jsonschema').validate;

app.disable('etag');
app.set('json spaces', 2);
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
    res.header('Cache-Control', 'no-cache');
    res.on('finish', () => {
        console.log('New request:   ' + req.method + '   ' + req.path + ' [' + res.statusCode + ']');
    });
    next();
});

const webpack = require('webpack');
const webpackConfig = require(path.resolve('webpack.config.js'));
const compiler = webpack(webpackConfig);
const webpackHotMiddleware = require('webpack-hot-middleware');
const hotMiddleware = webpackHotMiddleware(compiler);

app.use(hotMiddleware);

app.use(require('webpack-dev-middleware')(compiler, {
   noInfo: true,
   publicPath: webpackConfig.output.publicPath,
   stats: { colors: true }
}));

//require('./modules/env');

var carStatus = { 
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1e/A_blank_black_picture.jpg",
    Temperature: 83.6,
    DateTime: "Sun Oct 14 2018 07:18:16 GMT-0400 (Eastern Daylight Time)",
    PIRalarm: false,
    DoorsLocked: true,
    EngineOn: false,
    WindowsUp: true,
    GearState: "park"
}

app.get('/data', (req, res) => {
    res.status(200).json(carStatus);
});

var loginSchema = {
    "id": "/Login",
    "type": "object",
    "properties": {
        "username": {"type": "string"},
        "password": {"type": "string"}
    },
    "required": [
        "username",
        "password"
    ]
}

app.use(express.static('img'))

app.post('/login', (req, res) => {
    var incomingData = req.body;
    console.log(incomingData)
    var dataStructure = validate(incomingData, loginSchema);
    if (dataStructure.errors.length > 0) {
        var errors = [];
        for (var i in dataStructure.errors) {
            errors.push(dataStructure.errors[i].message);
        }
        var response = {
            "message": "Error: Invalid data structure",
            "errors": errors
        }
        res.status(422).json(response);
    } else {
        if (incomingData.username == 'chris' && incomingData.password == 'password') {
            res.status(200).json({"message": "Success: User authenticated", "token": "mycustomtoken"});
        } else {
            return res.status(401).send('Error: Authentication failure');
        }
    }
});

var schema = {
    "id": "/CarStatus",
    "type": "object",
    "properties": {
        "imageUrl": {"type": "string"},
        "Temperature": {"type": "float"},
        "DateTime": {"type": "string"},
        "PIRalarm": {"type": "boolean"},
        "DoorsLocked": {"type": "boolean"},
        "EngineOn": {"type": "boolean"},
        "WindowsUp": {"type": "boolean"},
        "GearState": {"type": "string"}
    },
    "required": [
        "imageUrl",
        "Temperature",
        "DateTime",
        "PIRalarm",
        "DoorsLocked",
        "DoorsLocked",
        "EngineOn",
        "WindowsUp",
        "GearState"
    ]
}

app.post('/data', auth, (req, res) => {
    var incomingData = req.body
    var dataStructure = validate(incomingData, schema);
    if (dataStructure.errors.length > 0) {
        var errors = [];
        for (var i in dataStructure.errors) {
            errors.push(dataStructure.errors[i].message);
        }
        var response = {
            "message": "Error: Invalid data structure",
            "errors": errors
        }
        res.status(422).json(response);
    } else {
        carStatus = req.body;
        res.status(200).json({"message": "Success: Data updated"});
    }
});

app.get('*', (req, res) => {
    var indexFile = __dirname.replace('server', 'public/index.html')
    res.sendFile(indexFile);
});

app.listen(80, () => {
    console.log(`Webserver started on port ${80}`);
    console.log(`Webserver address: ${''}`);
});