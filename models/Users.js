const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	login: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

module.exports = user = mongoose.model('user', UserSchema);
