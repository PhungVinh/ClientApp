var express = require('express');
var app = express();
var fs = require("fs");
const bodyParser = require('body-parser');
var busboy = require('connect-busboy');


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
app.use(busboy({ immediate: true }));

app.get('/api/users', function (req, res) {
    fs.readFile(__dirname + "/fake/" + "users.json", 'utf8', function (err, data) {
        console.log(__dirname + "/fake/" + "users.json", data);
        res.end(data);
    });
})

app.post('/api/users', function (req, res) {
    // GET data from response body
    const user = req.body;
    let newData = '';
    // First read existing users.
    fs.readFile(__dirname + "/fake/" + "users.json", 'utf8', function (err, data) {
        data = data ? JSON.parse(data) : [];
        // INSERT If user data is valid
        if (user.id === null || user.id === undefined) {
            user.id = data.map(u => u.id).reduce((a, b) => a > b ? a : b, 0) + 1;
            data.push(user);
        }
        // STORE data
        newData = JSON.stringify(data);
        fs.writeFile(__dirname + "/fake/" + "users.json", newData, function (err) {
            if (err) {
                return console.log(err);
            }
        });
        // RESPONSE
        res.end(newData);
    });
})

app.put('/api/users', function (req, res) {
    // GET data from response body
    const user = req.body;
    let newData = '';
    // First read existing users.
    fs.readFile(__dirname + "/fake/" + "users.json", 'utf8', function (err, data) {
        data = data ? JSON.parse(data) : [];
        // INSERT If user data is valid
        if (!(user.id === null && user.id === undefined)) {
            if (data && data.some(u => u.id == user.id)) {
                const userUpdate = data.filter(u => u.id == user.id)[0];
                userUpdate.name = user.name;
                userUpdate.password = user.password;
                userUpdate.profession = user.profession;
            }
        }
        // STORE data
        newData = JSON.stringify(data);
        fs.writeFile(__dirname + "/fake/" + "users.json", newData, function (err) {
            if (err) {
                return console.log(err);
            }
        });
        // RESPONSE
        res.end(newData);
    });
})

app.get('api/users/:id', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/fake/" + "users.json", 'utf8', function (err, data) {
        var users = data ? JSON.parse(data) : [];
        var user = null;
        if (users && users.some(u => u.id == req.params.id)) {
            user = users.filter(u => u.id == req.params.id)[0];
        }
        res.end(JSON.stringify(user));
    });
})

app.delete('/api/users/:id', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/fake/" + "users.json", 'utf8', function (err, data) {
        var users = data ? JSON.parse(data) : [];
        var user = null;
        let newData = '';
        if (users && users.some(u => u.id == req.params.id)) {
            user = users.filter(u => u.id == req.params.id)[0];
        }
        users.splice(users.indexOf(user), 1);
        // STORE data
        newData = JSON.stringify(users);
        fs.writeFile(__dirname + "/fake/" + "users.json", newData, function (err) {
            if (err) {
                return console.log(err);
            }
        });
        // RESPONSE
        res.end(newData);
    });
})

app.post('/api/upload-file', function (req, res, next) {
    var fstream;
    if (req.busboy) {

        // req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        //     console.log('----------', fieldname, file, filename, encoding, mimetype);
        //     fstream = fs.createWriteStream(__dirname + '/assets/upload/' + filename);
        //     console.log('----------');
        //     file.pipe(fstream);
        //     console.log('----------');
        //     fstream.on('close', function () {
        //         console.log('file ' + fieldname + ' uploaded');
        //     });
        // });
        req.busboy.on('finish', function () {
            console.log('finish, files uploaded ');
            res.json({ success: true });
        });
        req.pipe(req.busboy);
    }
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})