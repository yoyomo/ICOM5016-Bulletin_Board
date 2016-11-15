var express = require('express');
var app = express();
app.use(express.static('www'));
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
	
    console.log('Express server listening on port ' + app.get('port'));
});
var fs = require("fs");
var pg, conString, client, query;
function clientConnect(){
	pg = require('pg');
	pg.defaults.ssl = true;          
	conString = process.env.DATABASE_URL ||
	  "postgres://cggtxtfflkmdrx:l9xnU_uY1DpvOh6YrdOnn2MbTS@ec2-54-225-121-93.compute-1.amazonaws.com:5432/d395p50rdtiaf1";
	client = new pg.Client(conString);
	client.connect();
}

app.get('/db/get', function (req,res) {
	clientConnect();
	query = client.query("select * from member;");    
   	query.on("end", function (result) {          
   		client.end(); 
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write(JSON.stringify(result.rows[0].username));
		res.end();  
	});
})

app.get('/db/get/event', function (req,res) {
	clientConnect();
	query = client.query("select category,postID,title,description, attachment, dateAdded\
	from event");    
   	query.on("end", function (result) {          
   		client.end(); 
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write(JSON.stringify(result.rows, null, "    "));
		res.end();  
	});
})

app.get('/db/get/book', function (req,res) {
	clientConnect();
	query = client.query("select category,postID,title,description, attachment, dateAdded\
    from book");    
   	query.on("end", function (result) {          
   		client.end(); 
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write(JSON.stringify(result.rows, null, "    "));
		res.end();  
	});
})

app.get('/db/get/mentorship', function (req,res) {
	clientConnect();
	query = client.query("select category,postID,title,description, attachment, dateAdded\
	from mentorship");    
   	query.on("end", function (result) {          
   		client.end(); 
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write(JSON.stringify(result.rows, null, "    "));
		res.end();  
	});
})

app.get('/db/get/housing', function (req,res) {
	clientConnect();
	query = client.query("select category,postID,title,description, attachment, dateAdded\
	from housing");    
   	query.on("end", function (result) {          
   		client.end(); 
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write(JSON.stringify(result.rows, null, "    "));
		res.end();  
	});
})

app.get('/db/get/other', function (req,res) {
	clientConnect();
	query = client.query("select category,postID,title,description, attachment, dateAdded\
	from other");    
   	query.on("end", function (result) {          
   		client.end(); 
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write(JSON.stringify(result.rows, null, "    "));
		res.end();  
	});
})

app.get('/db/get/:category/:postID/', function (req,res) {
	clientConnect();
	if(req.params.category== 'e'){
		query = client.query("\
		select *\
		from event\
		where postID="+req.params.postID+" and category='"+req.params.category+"' ;"
		);  
	}  
	else if(req.params.category== 'b'){
		query = client.query("\
		select *\
		from book\
		where postID="+req.params.postID+" and category='"+req.params.category+"' ;"
		);  
	}  
	else if(req.params.category== 'h'){
		query = client.query("\
		select *\
		from housing\
		where postID="+req.params.postID+" and category='"+req.params.category+"' ;"
		);  
	} 
	else if(req.params.category== 'm'){
		query = client.query("\
		select *\
		from mentorship\
		where postID="+req.params.postID+" and category='"+req.params.category+"' ;"
		);  
	} 
	else if(req.params.category== 'o'){
		query = client.query("\
		select *\
		from other\
		where postID="+req.params.postID+" and category='"+req.params.category+"' ;"
		);  
	} 
	else{
		//
	}

   	query.on("end", function (result) {          
   		client.end(); 
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write(JSON.stringify(result.rows[0], null, "    "));
		res.end();  
	});
})



app.get('/db/get/announcements', function (req,res) {
	clientConnect();
	query = client.query(
		"with announcements as \
		((select category,postID,title,description, attachment, dateAdded\
		from event )\
		union \
		(select category,postID,title,description, attachment, dateAdded\
		from book)\
		union\
		(select category,postID,title,description, attachment, dateAdded\
		from housing)\
		union\
		(select category,postID,title,description, attachment, dateAdded\
		from mentorship)\
		union\
		(select category,postID,title,description, attachment, dateAdded\
		from other))\
		select *\
		from announcements\
		order by dateAdded;"
	);    
   	query.on("end", function (result) {          
   		client.end(); 
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write(JSON.stringify(result.rows, null, "    "));
		res.end();  
	});
})

app.get('/db/get/premiumPosts',function(req,res) {
	clientConnect();
	query = client.query(
		"with announcements as \
		((select category,postID,uID,title,description, attachment, dateAdded\
		from event )\
		union \
		(select category,postID,uID,title,description, attachment, dateAdded\
		from book)\
		union\
		(select category,postID,uID,title,description, attachment, dateAdded\
		from housing)\
		union\
		(select category,postID,uID,title,description, attachment, dateAdded\
		from mentorship)\
		union\
		(select category,postID,uID,title,description, attachment, dateAdded\
		from other))\
		\
		select distinct category,postID,uID,title,description, attachment, dateAdded\
		from announcements natural join member\
		where member.typeOfAccount='Premium'\
		order by dateAdded;"
		);
	query.on("end", function (result) {          
   		client.end(); 
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write(JSON.stringify(result.rows, null, "    "));
		res.end();  
	});
})