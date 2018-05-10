const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
//const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');
const Lists = require('../models/lists');
const Submission = require('../models/submission');

//saving a submission to the database
//the data will be like this format 
//create our object {city:'XXX',blank:'',spoiled:'',canceled:'',total:''username:'XXX',data:[{id:0,nom_list_fr:'XXX',number:}{}]};
router.post('/add_submission', (req, res) => {
  console.log(req.body.blank, req.body.blank,
    req.body.spoiled,
    req.body.canceled,
    typeof (req.body.total),
    typeof (req.body.username),
    typeof (req.body.data));
  var submission = new Submission({
    city: req.body.city,
    blank: req.body.blank,
    spoiled: req.body.spoiled,
    canceled: req.body.canceled,
    total: req.body.total,
    username: req.body.username,
    data: req.body.data,

  });
  submission.save((err) => {

    if (err) {
      console.log(err, 'dd');
    }
    else {
      res.json({ success: true, msg: 'submission successfully Added to db.' });
    }
  });
});

//Get the lists 
router.get('/get_lists', (req, res) => {
  console.log(req.query.nom_fr);
  Lists.find({ nom_fr: req.query.nom_fr }, function (err, docs) {
    if (docs) {
      res.json(docs);
    } else {
      console.log('err', err);
    }

  })

})
//get distinct list of municipalities
router.get('/get_mun', (req, res) => {
  Lists.distinct("nom_fr", function (err, docs) {
    if (docs) {
      let result=[],obj={};
      docs.sort()
      for (let i = 0; i < docs.length; i++) {
        const element = docs[i];
        obj={};
        obj.value=element;obj.label=element
        result.push(obj);
        
      }
      res.json(result);//[Ariana,Beja....] --should be transformed to------>[{value:'Ariana',label:'Ariana'},{}] 
      //console.log(docs);
    } else {
      console.log('err', err);
    }

  })

})
module.exports = router;