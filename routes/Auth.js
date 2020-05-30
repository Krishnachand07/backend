const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const User = require('../models/Users');
const Profile = require('../models/Profile');
const Details = require('../models/Details');
router.post('/', (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ msg: 'Please enter the fields' });
	}
	User.findOne({ email }).then((user) => {
		if (!user) return res.status(400).json({ msg: 'User does not exists' });

		bcrypt.compare(password, user.password).then((isMatch) => {
			if (!isMatch) return res.status(400).json({ msg: 'Invalid password' });

			jwt.sign({ id: user.id }, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
				if (err) throw err;
				res.json({
					token,
					user: {
						id: user.id,
						email: user.email,
						login: user.login
					}
				});
			});
		});
	});
});

router.get('/user', auth, (req, res) => {
	User.findById(req.user._id).select('-password').then((user) => {
		res.json(user);
	});
});

router.post('/profile', upload, (req, res) => {
	const { name, email, phone, dob, gender, address } = req.body;
	const file = req.file;

	if (!name || !email || !phone || !dob || !gender || !address || !file) {
		return res.status(400).json({ msg: 'Enter the fields' });
	}
	Profile.findOne({ email }).then((emp) => {
		if (emp) return res.status(400).json({ msg: 'This profile already exists' });

		const user = new Profile({
			name,
			email,
			phone,
			dob,
			gender,
			address,
			file
		});
		user.file.data = file.buffer;
		user.file.contentType = file.mimetype;
		user
			.save()
			.then((user) => {
				res.json({
					name: user.name,
					email: user.email
				});
			})
			.catch((err) => {
				if (err) throw err;
				res.status(400).json({ msg: 'Something went wrong!!' });
			});
	});
});

router.get('/profile', (req, res) => {
	Profile.find().then((result) => res.json(result));
});

router.get('/details', (req, res) => {
	Details.find().then((result) => res.json(result));
});
module.exports = router;
