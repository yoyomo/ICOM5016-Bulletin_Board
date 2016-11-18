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

app.get('/db/get/announcement/:category/:postID/', function (req,res) {
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
		order by dateAdded desc;"
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
		order by dateAdded desc;"
		);
	query.on("end", function (result) {          
   		client.end(); 
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write(JSON.stringify(result.rows, null, "    "));
		res.end();  
	});
})

app.get('/db/get/search/:searchtext', function (req,res) {
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
		where lower(title) like lower('%"+req.params.searchtext+"%')\
		or lower(description) like lower('%"+req.params.searchtext+"%')\
		order by dateAdded desc;"
	);    
   	query.on("end", function (result) {          
   		client.end(); 
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write(JSON.stringify(result.rows, null, "    "));
		res.end();  
	});
})

app.get('/db/get/login/:email/:password', function (req,res) {
	clientConnect();
	query = client.query("select distinct *\
	from member\
	where email='"+req.params.email+"' and password='"+req.params.password+"'\
	");    
   	query.on("end", function (result) {          
   		client.end(); 
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.status(200).write(JSON.stringify(result.rows, null, "    "));
		res.end();  
	});
})

app.get('/db/get/user/:uID/:username/:email/', function (req,res) {
	clientConnect();
	query = client.query("select *\
	from member\
	where uID="+req.params.uID+" and username='"+req.params.username+"'\
	and email='"+req.params.email+"'\
	");    
   	query.on("end", function (result) {          
   		client.end(); 
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.status(200).write(JSON.stringify(result.rows[0], null, "    "));
		res.end();  
	});
})

app.get('/db/get/user/announcements/:uID/', function (req,res) {
	clientConnect();
	query = client.query("\
		with announcements as \
		((select category,postID,uid,title,description, attachment, dateAdded\
		from event )\
		union \
		(select category,postID,uid,title,description, attachment, dateAdded\
		from book)\
		union\
		(select category,postID,uid,title,description, attachment, dateAdded\
		from housing)\
		union\
		(select category,postID,uid,title,description, attachment, dateAdded\
		from mentorship)\
		union\
		(select category,postID,uid,title,description, attachment, dateAdded\
		from other))\
\
		select *\
		from announcements\
		where uid="+req.params.uID+"\
		order by dateadded desc\
	");    
   	query.on("end", function (result) {          
   		client.end(); 
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write(JSON.stringify(result.rows, null, "    "));
		res.end();  
	});
})

app.get('/db/get/user/payments/:uID/', function (req,res) {
	clientConnect();
	query = client.query("\
		with announcements as ((select category,postID,uID,title,description, attachment, dateAdded\
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
		select p.*,a.title,c.cardtype\
		from payment as p natural join announcements as a, creditcard as c\
		where c.cardid=p.cardid\
		and (buyerid="+req.params.uID+" or sellerid="+req.params.uID+")\
		order by dateAdded desc\
	");    
   	query.on("end", function (result) {          
   		client.end(); 
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write(JSON.stringify(result.rows, null, "    "));
		res.end();  
	});
})

app.get('/db/get/chatlogs/:loggedInUser/', function (req,res) {
	clientConnect();
	query = client.query("\
		select *\
		from (\
		  select message.*,member.uid,member.username,member.profpic,\
		         row_number() over (partition by chatid order by datesent desc) as rn\
		  from message, member\
		  where (senderid="+req.params.loggedInUser+" and receiverid=member.uid)\
		  or (member.uid=senderid and receiverid="+req.params.loggedInUser+")\
		) t\
		where rn = 1\
		order by datesent desc\
	");    
   	query.on("end", function (result) {          
   		client.end(); 
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write(JSON.stringify(result.rows, null, "    "));
		res.end();  
	});
})

app.get('/db/get/messages/:loggedInUser/:messageUser/', function (req,res) {
	clientConnect();
	query = client.query("\
		select m.*,u.username as messageUser\
		from message as m, member as u\
		where ((senderID="+req.params.loggedInUser+" \
		and receiverid="+req.params.messageUser+")\
		or (senderid="+req.params.messageUser+" \
		and receiverid="+req.params.loggedInUser+"))\
		and (u.uid="+req.params.messageUser+")\
		order by datesent\
	");    
   	query.on("end", function (result) {          
   		client.end(); 
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write(JSON.stringify(result.rows, null, "    "));
		res.end();  
	});
})


app.get('/db/get/admin/:uID/', function (req,res) {
	clientConnect();
	query = client.query("\
		select *\
		from admin natural join member\
		where uID="+req.params.uID+"\
	");    
   	query.on("end", function (result) {          
   		client.end(); 
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write(JSON.stringify(result.rows[0], null, "    "));
		res.end();  
	});
})

app.get('/db/get/reports/', function (req,res) {
	clientConnect();
	query = client.query("\
		select *\
		from report\
	");    
   	query.on("end", function (result) {          
   		client.end(); 
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write(JSON.stringify(result.rows, null, "    "));
		res.end();  
	});
})

app.get('/db/get/creditcards/:uid', function (req,res) {
	clientConnect();
	query = client.query("\
		select *\
		from creditcard\
		where uid="+req.params.uid+"\
	");    
   	query.on("end", function (result) {          
   		client.end(); 
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write(JSON.stringify(result.rows, null, "    "));
		res.end();  
	});
})
