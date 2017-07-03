var express = require('express');
var app = express();
var logic = require('./logic.js');

const { Pool } = require('pg')
var pool;
var connectionString;
if (process.env.DATABASE_URL){
	connectionString = process.env.DATABASE_URL;
	pool = new Pool({
		connectionString: connectionString,
	})
}
else{
	pool = new Pool({
		user: 'postgres',
		database: 'forum'
	})
}


console.log(connectionString);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));


// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get("/ups", function(request, response){
	response.sendFile(__dirname + "/public/prove09.html");
})

app.get("/forum", function(request, response){
	response.sendFile(__dirname + "/public/forum.html");
})

app.get("/rates", function(request, response){

	var mailType = request.query.mailType;
	var weight = request.query.weight;
	var price = logic.calculatePrice(weight, mailType);
	var params = {
		mailType: mailType,
		weight: weight,
		price: price
	}
	
	response.render("results.ejs", params);
})

app.get('/retrieveInfo', function(request, response){
	pool.query("SELECT * FROM post", (err, res) => {
	  if (err) {
	    throw err;
	  }
	  //console.log('Post:', res.rows[0]);
	  response.json(res.rows);
	  response.end();
	})
});

app.get('/createPost/:alias/:content/:imagePath', function(request, response){
	
	console.log(request.params.alias);
	pool.query("INSERT INTO post(time_stamp, user_alias, content, image_path) VALUES ('2017-5-20', '"+ request.params.alias + "', '"+ request.params.content +"', '"+ request.params.imagePath + "')",  (err, res) => {
	  if (err) {
	    throw err;
	  }
	  else{
	  	response.write("post created!")
	  	response.end();
	  }
	})
});

app.get('/deletePost', function(request, response){
	pool.query("DELETE FROM post",  (err, res) => {
	  if (err) {
	    throw err;
	  }
	  else{
	  	response.write("you deleted everything, way to go.")
	  	response.end();
	  }
	})
});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


