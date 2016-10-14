var express = require('express'),
app = express();
app.use(express.static('www'));
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
	
    console.log('Express server listening on port ' + app.get('port'));
});
var fs = require("fs");

app.get('/findData', function (req, res) {
   fs.readFile( __dirname + "/" + "json/data.json", 'utf8', function (err, data) {
      console.log( data, err );
      res.end( data );
   });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})