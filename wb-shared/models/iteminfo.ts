'use strict'
import mongoose = require('mongoose');
let Schema = mongoose.Schema, log = require('../utils/logger').root.child({ 'module': __filename.substring(__dirname.length + 1, __filename.length - 3) }), bcrypt = require('..').utils.crypter, co = require('co'), Constants = require('../utils/constants.js');

var ItemSchema = new Schema(
  {
    iName: {
      type: String,
      default: null
    },
    clothType: {
      type: Number,
      enum: Constants.CLOTHTYPE
    },
    cost: {
      classic: {
        type: Number,
        default: 5
      },
      super: {
        type: Number,
        default: 10
      },
      ultra: {
        type: Number,
        default: 15
      }
    },
    created: {
      type: Date,
      default: Date.now
    },
    modified: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: {
      tranform: function(docM, retJ, option) { //docM : mongoose object(BSON), retJ : JSON object
        delete retJ.__v;
        if (retJ.created)
          retJ.created = new Date(retJ.created).getTime();
        if (retJ.modified)
          retJ.modified = new Date(retJ.modified).getTime();

        return retJ;
      }
    }
  }
);

mongoose.model('Item', ItemSchema);
