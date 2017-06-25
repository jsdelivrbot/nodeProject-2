var express = require('express');
var app = express();
var logic = require('./logic.js');

var pg = require('pg');

pg.defaults.ssl = true;

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
	pg.connect(process.env.DATABASE_URL, function(err, client) {
  		if (err) throw err;
  		console.log('Connected to postgres! Getting schemas...');

  		client
    		.query('SELECT table_schema,table_name FROM information_schema.tables;')
    		.on('row', function(row) {
      		response.json(row);
    });
});
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


