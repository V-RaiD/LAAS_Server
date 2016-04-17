'use strict'
import mongoose = require('mongoose');
let Schema = mongoose.Schema, Constants = require('../utils/constants.js');

var UserSchema = new Schema(
  {
    name : {
      fname : {
        type : String,
        required : true
      },
      lname : {
        type : String,
        default : ''
      }
    },
    email : {
      type : String,
      required : true,
      unique : true
    },
    password : {
      type : String,
      required : true
    },
    phone : {
      type : String,
      unique : true
    },
    dob : {
      type : Date,
    },
    gender : {
      type : String,
      enum : Constants.GENDERS
    },
    utype : {
      type : Number,
      required : true,
      enum : Constants.UTYPE
    },
    address : {
      addressCurr : {
        type : String
      },
      addressFinal : {
        type : String
      }
    },
    created : {
      type : Date,
      default : Date.now
    },
    modified : {
      type : Date,
      default : Date.now
    }
  },
  {
    toJSON : {
      tranform : function (docM, retJ, option){ //docM : mongoose object(BSON), retJ : JSON object
        delete retJ.__v;

        retJ.created = new Date(retJ.created).getTime();
        retJ.modified = new Date(retJ.modified).getTime();

        return retJ;
      }
    }
  }
);

mongoose.static("defUserSchema", function ());
mongoose.model('User', UserSchema);
