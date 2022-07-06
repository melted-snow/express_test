const express = require('express');
const router = express.Router();
const cors = require('cors');
const Test = require('../models/Test');

router.use(express.json());
router.use(cors({
    origin: 'http://localhost:3000', //アクセス許可するオリジン
    credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    optionsSuccessStatus: 200 //レスポンスstatusを200に設定
  }))
  

router.get('/', async (req, res) => {

	const test = await Test.find({});
	res.json(test);
});



router.post('/', async (req,res)=>{
	const user = new Test({
		name: req.body.name,
		data: req.body.data
	});

	const savedUser = await user.save();
	res.json(savedUser);

});

router.get('/:userID', (req, res) => {
    try {
      Test.findById(req.params.userID, (err, user) => {
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
	const test = await Test.remove({_id: req.params.userID});
	res.send(test);
});

router.patch('/:userID',async (req,res)=>{
	console.log(req.body.age);
	const test = await Test.updateOne({_id: req.params.userID},{$set:{data:req.body.data}});
	res.send(test);
});

module.exports = router;