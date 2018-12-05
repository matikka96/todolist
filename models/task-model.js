const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
	userID: String,
	text: String,
	done: Boolean
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;