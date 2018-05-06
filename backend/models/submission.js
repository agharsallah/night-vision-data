const mongoose = require('mongoose');
const titlize = require('mongoose-title-case');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');
const bcrypt = require('bcrypt-nodejs');
const config = require('../config/db');

const submissionSchema = new mongoose.Schema({

  city: { type: String },
  username: { type: String },
  blank: { type: Number },
  spoiled: { type: Number },
  canceled: { type: Number },
  total: { type: Number },
  data:{type:Array}
  
});


const Submission = module.exports = mongoose.model('submission', submissionSchema);
