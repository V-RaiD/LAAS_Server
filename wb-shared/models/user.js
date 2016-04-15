'use strict'
let mongoose = require('mongoose'), Schema = mongoose.Schema, Constants = require('../utils/constants.js');

UserSchema = new Schema(
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
      type : String
    },
    
  }
);
