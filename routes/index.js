const express = require('express');
const { response } = require('../app');
const router = express.Router();


const getTokens = require('../src/js/getTokens');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'XRPL NFToken Viewer'});
});

/* GET explorer page. */
router.get('/explorer/:id', function (req, res, next) {
  var nftokens = getTokens.getTokens(req.params.id);
  console.log(1);
  nftokens.then((response)=>{
    console.log(nftokens);

    console.log(2);
    console.log(response);
    console.log(3);
    res.render('index', { title: 'XRPL NFToken Viewer', nftokens: response.result.account_nfts});
    console.log(4);
  });
  console.log(5);
  
});

module.exports = router;
