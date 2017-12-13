var express = require("express");
var app = express() ;
var mongojs = require("mongojs");
var db = mongojs("contactList",["contactList"]);
var bodyParser = require("body-parser");

/*
app.get('/', function (req, res){
	res.send("Hello World from server.js")
});
*/
app.use(express.static( __dirname + '/public' )) ;
app.use(bodyParser.json()) ;

app.get('/contactList',function(req, res){
	console.log("I received a GET request")

	// query data from mongodb
	db.contactList.find(function (err, docs) {
		console.log(docs);
		//console.log("err" + err);
		res.json(docs);
	});

	/*********************************
		dummy data
	person1 ={
		name: "Neil Bohr" ,
		email: "bohn@email.com",
		number: "123-333-99-789"
	}

	person2 ={
		name: "Frewol Fabiut" ,
		email: "fredv@email.com",
		number: "343-99-789"
	}

	person3 ={
		name: "Zingraff Vehnment" ,
		email: "bostical@email.com",
		number: "123-557-789"
	}

	var contactList = [person1, person2, person3]; 
	res.json(contactList) ;

	*********************************/

});

// Add Record: received posted data by post from controller
app.post('/contactList', function (req, res) {
	console.log(req.body); // install body-parser to parse the body
	db.contactList.insert(req.body, function(err, doc) {
		res.json(doc) ;
	})
}); 

// Remove Record
app.delete('/contactList/:id', function(req, res){
	var id = req.params.id ;
	console.log(id);
	db.contactList.remove({_id: mongojs.ObjectId(id)})
});

// Edit Record
app.get('/contactList/:id', function (req, res) {
	var id = req.params.id ;
	console.log(id);
	db.contactList.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	})
}); 

//Update Record
app.put('/contactList/:id', function(req, res) {
	var id = req.params.id ;
	console.log(req.body.name) ;
	db.contactList.findAndModify({ query: {_id: mongojs.ObjectId(id)},
		update: { $set: {name: req.body.name, email: req.body.email, number: req.body.number }},
		new: true}, function (err, doc) {
			res.json(doc) ;
		});
});


app.listen(3000);
console.log("Server running on port 3000");
