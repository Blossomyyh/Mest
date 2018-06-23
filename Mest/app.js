var express = require('express');
var app = express();
var http = require('http').Server(app);
app.use(express.static('./'))


app.get('/', function(req, res){
    res.sendFile(__dirname+'/mest.html');
});


app.listen(8888, function () {
    console.log('Example app listening on port 8888!');
});