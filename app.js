const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./routes/user'); //追加
const testRouter = require('./routes/test'); //追加

app.use('/user', userRouter);　//追加
app.use('/test', testRouter);　//追加


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

  app.post("/", function (req, res) {
	try {
	  res.json({"s":"ss"}); // jsonで返却
	} catch (error) {
	  console.error(error);
	}
  });

mongoose.connect('mongodb://127.0.0.1/test_db',options);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Database connection successful'));



app.listen(port, 
	() => console.log(`Example app listening on port ${port}!`));