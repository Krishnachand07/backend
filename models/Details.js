const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Details = new Schema({
	localtime: {
		type: String,
		required: true
	},
	person: {
		type: String,
		required: true
	}
});

module.exports = details = mongoose.model('facedetail', Details);
