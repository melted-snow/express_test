const express = require('express');
const router = express.Router();
const cors = require('cors');
const Memo = require('../models/Memo');

router.use(express.json());
router.use(cors({
    origin: 'http://localhost:3000', //アクセス許可するオリジン
    credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    optionsSuccessStatus: 200 //レスポンスstatusを200に設定
  }))
  


router.get('/', async (req, res) => {

    const query = req.query
    const type = query.type
    const keyword = query.keyword

    const memo = await Memo.find({});
    const array = []

    memo.map(user=>{
        user.largeData.map(unit=>{
            if(type === unit.type || type === ""){
            console.log(keyword)
            unit.smallData.map(smalldata=>{
                var regex = new RegExp(`${keyword}*`, 'g');
               if(!smalldata.secret){
                if(keyword === "" || regex.test(unit.title)){
                array.push(
                    {
                        "title":unit.title,
                        "length":smalldata.length,
                        "text":smalldata.text
                    }
                )
            }
            }
        })
        }
        })
    })

	res.json(array);

  });

module.exports = router;

