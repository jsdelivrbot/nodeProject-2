var express = require('express');
var app = express();
var logic = require('./logic.js');

const { Pool } = require('pg')

const pool = new Pool({
	user: 'tsqwuuvdevwrjh',
	database: 'd2m1360k901veu',
	host: 'ec2-107-21-99-176.compute-1.amazonaws.com',
	password: '2f95f210acd309026be0b0f6711b2f898d4727e63968d1be8eeb8172fb3fc662'
})
console.log(process.env);

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
	var id = request.query.id;
	console.log(id);
	var params = [id];
	pool.query("SELECT * FROM post WHERE id = $1::int", params, (err, res) => {
	  if (err) {
	    throw err;
	  }
	  console.log('Post:', res.rows[0]);
	  response.json( res.rows[0]);
	  response.end();
	})
});

app.get('/createPost', function(request, response){
	//var id = request.query.id;
	//console.log(id);
	//var params = [id];
	pool.query("INSERT INTO post(time_stamp, user_alias, content, image_path) VALUES ('2017-5-20', 'captainCornstarch', 'hhey guys', 'what.jpg')",  (err, res) => {
	  if (err) {
	    throw err;
	  }
	  console.log('Post:', res.rows[0]);
	  response.json( res.rows[0]);
	  response.end();
	})
});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


