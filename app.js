const express = require('express');
const app = express();
const mongoose = require('mongoose');
const memoRouter = require('./routes/memo'); //追加
const searchRouter = require('./routes/search'); //追加

app.use('/memo', memoRouter);　//追加
app.use('/search', searchRouter);　//追加


const port = 8000; // listenするport番号

const options = {
	useUnifiedTopology : true,
	useNewUrlParser : true
}


app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader(
	  "Access-Control-Allow-Methods",
	  "GET, POST, PUT, PATCH, DELETE, OPTION"
	)
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
	next()
  })


mongoose.connect('mongodb://127.0.0.1/test_db',options);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Database connection successful'));



app.listen(port, 
	() => console.log(`Example app listening on port ${port}!`));