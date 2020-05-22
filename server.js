const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const user = require('./routes/user');
const auth = require('./routes/Auth');
const config = require('config');

const app = express();

const db = config.get('mongoURI');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
	.connect(db, {
		useCreateIndex: true,
		useNewUrlParser: true
	})
	.then(() => console.log('connectec db'))
	.catch((err) => console.log(err));

app.use(cors());

app.get('/', (req, res) => {
	res.json('working');
	console.log('working');
});

app.use('/user', user);
app.use('/auth', auth);

app.listen(process.env.PORT || 5000);
