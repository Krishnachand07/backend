const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../models/Users');

router.post('/', (req, res) => {
	const { email, login, password } = req.body;
	if (!email || !login || !password) {
		return res.status(400).json({ msg: 'Please enter the fields' });
	}
	User.findOne({ email }).then((user) => {
		if (user) return res.status(400).json({ msg: 'User already exists' });

		const newUser = new User({
			login,
			email,
			password
		});

		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser.save().then((user) => {
					jwt.sign({ id: user.id }, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
						if (err) throw err;
						res.json({
							token,
							user: {
								id: user.id,
								login: user.login,
								email: user.email
							}
						});
					});
				});
			});
		});
	});
});

module.exports = router;
