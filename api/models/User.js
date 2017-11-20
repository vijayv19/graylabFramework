/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var mongoose = require('mongoose');

var userSchema = new Schema({

  uname: {
    type: 'string',
  },

  age: {
    type: 'string'
  }
});

var person = mongoose.model('User',userSchema);

var model = {



};

module.exports = _.assign(model);
