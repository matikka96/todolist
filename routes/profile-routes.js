const router = require('express').Router();
const User = require('../models/user-model');
const Task = require('../models/task-model');


const authCheck = (req, res, next) => {
	if (!req.user) {
		// res.redirect('/login')
		res.send('login')
	} else {
		next();
	}
};

router.get('/', authCheck, (req, res) => {
	res.send('User is: '+req.user);
});

router.post('/add', authCheck, (req, res) => {
	console.log('/add: '+req.body.text);
	new Task({
		userID: req.user.id,
		text: req.body.text,
		done: false
	}).save().then((newTask) => {
		res.send(newTask);
	});
});

router.get('/load', authCheck, (req, res) => {
	Task.find({userID : req.user.id}).then((searchResult) => {
		res.send(searchResult);
	})
})

router.post('/delete', authCheck, (req, res) => {
	Task.deleteOne({
		userID : req.user.id,
		text : req.body.text
	}).then((result) => {
		res.send(result);
	})
})

router.post('/update', authCheck, (req, res) => {
	Task.findByIdAndUpdate(req.body.taskID).then((result) => {
		result.done = req.body.done;
		result.save();
		res.send(result);
	})
})

module.exports = router;