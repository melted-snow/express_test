const express = require('express');
const router = express.Router();
const cors = require('cors');
const Memo = require('../models/Memo');

router.use(express.json());
router.use(cors({
    origin: '*', //アクセス許可するオリジン
    credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    optionsSuccessStatus: 200 //レスポンスstatusを200に設定
  }))
  

router.post('/', async (req,res)=>{
	const memo = new Memo({
		userId: req.body.userId,
		largeData: req.body.largeData
	});

	const savedMemo = await memo.save();
	res.json(savedMemo);

});

router.get('/', async (req, res) => {
  const query = req.query
  const userId = query.userId


const memo = await Memo.find({});

  memo.map(user=>{
	if(user.userId === userId){
		res.json(user)
		return
	}
  })

});
  router.delete('/:userID',async (req,res)=>{
	const test = await Memo.remove({_id: req.params.userID});
	res.send(test);
});

router.patch('/:userID',async (req,res)=>{
	console.log(req.body.age);
	const test = await Memo.updateOne({_id: req.params.userID},{$set:{data:req.body.data}});
	res.send(test);
});

router.get('/', async (req, res) => {

	const memo = await Memo.find({});
	res.json(memo);
});


module.exports = router;

