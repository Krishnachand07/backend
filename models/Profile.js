const moongose = require('mongoose');
const Schema = moongose.Schema;

const Profile = new Schema({
	name: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	dob: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		required: true
	}
});

module.exports = profile = moongose.model('profile', Profile);
