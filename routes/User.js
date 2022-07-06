const express = require('express');
const router = express.Router();
const cors = require('cors');
const User = require('../models/User');

router.use(express.json());
router.use(cors({
  origin: 'http://localhost:3000', //アクセス許可するオリジン
  credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
  optionsSuccessStatus: 200 //レスポンスstatusを200に設定
}))

router.get('/', async (req, res) => {

	const users = await User.find({});
  console.log(users)
	res.json(users);

  
});



router.post('/', async (req,res)=>{
	const user = new User({
		name: req.body.name,
		age: req.body.age
	});

	const savedUser = await user.save();
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
	res.json(savedUser);

});

router.get('/:userID', (req, res) => {
    try {
      User.findById(req.params.userID, (err, user) => {
        if (err) res.status(404).json('ユーザは存在しません');
        res.send(user);
      });
    } catch (err) {
      res.status(500).json({
        error: {
          name: err.name,
          message: err.message,
        },
      });
    }
  });

  router.delete('/:userID',async (req,res)=>{
	const user = await User.remove({_id: req.params.userID});
	res.send(user);
});

router.patch('/:userID',async (req,res)=>{
	console.log(req.body.age);
	const user = await User.updateOne({_id: req.params.userID},{$set:{age:req.body.age}});
	res.send(user);
});

module.exports = router;