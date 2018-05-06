const mongoose = require('mongoose');
const titlize = require('mongoose-title-case');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');
const bcrypt = require('bcrypt-nodejs');
const config = require('../config/db');

const ListsSchema = new mongoose.Schema({

  nom_fr: { type: String },
  nom_ar: { type: String },
  type_liste: { type: String },
  nom_liste_fr: { type: String },
  nom_liste_ar: { type: String },
  nombre_papier: { type: String }
  

});


const Lists = module.exports = mongoose.model('lists', ListsSchema);
