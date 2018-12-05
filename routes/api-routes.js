const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;

// MongoDB connect
var db;
MongoClient.connect('mongodb://mainuser:vilikissa123@ds115874.mlab.com:15874/todolistdb', (err, client) => {
	if (err) return console.log(err)
	db = client.db('todolistdb') // database name here
});

// Load tasks from db
router.get('/load', (req, res) => {
	var cursor = db.collection('todos').find({}, {projection:{ _id: 0 }}).toArray((err, result) => {
		res.send(result);
	});
});

// Add new todo
router.post('/add', (req, res) => {
	console.log(req.body.text);
  	db.collection('todos').save({text: req.body.text, done: false}, (err, result) => {
    if (err) return console.log(err)
    	res.send(`Added: ${req.body.text}`);
  });
})

// Delete todo
router.post('/delete', (req, res) => {
	let task = req.body.text;
	console.log(task);
	db.collection('todos').findOneAndDelete({text: task}, (err, result) => {
    if (err) return console.log(err) 
    res.send('Deleted from DB');
  })
})

// Update todo
router.post('/update', (req, res) => {
	let task = req.body.text;
	let status = req.body.done;
	db.collection('todos').update(
		{ text: task },
		{ $set: {
			text: task,	
			done: status
		}
	}, (err, result) => {
		if (err) console.log(err);
  	})
})

module.exports = router;
