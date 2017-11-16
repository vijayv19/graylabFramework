/**
 * Customer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var mongoose = require('mongoose');

var personSchema = new Schema({

  name: {
    type: 'string',
  },

  age: {
    type: 'string'
  }
});

var person = mongoose.model('Person', personSchema);

var model = {

  findAllData: function (data, callback) {

    console.log('@@@@@@@@@@@@@@@@', data);
    Person.find().exec(function (err, found) {

      console.log('****---@@@@@@@@@@@@@@@@@@@@@@@ ****');
      console.log('****---------------------------- !!!!!!!!!!!!!!!!!!!****', found);
      // console.log('*********************************** ****',Person);

      if (err) {
        console.log('**** error at function_name of Person.js ****', err);
        callback(err, null);
      } else if (_.isEmpty(found)) {
        callback(null, 'no data found');
      } else {
        console.log('****3333333333333333333333333333333333333333s ****', found);

        callback(null, found);
      }
    });

  },

  insertData: function (data, callback) {
    console.log('**** ^^^^^^^^^^^^^^^^^^^^^^^^^ ****', data);
    Person.create({
      name: data.name,
      age: data.age
    }).exec(function (err, person) {

      // Error handling
      if (err) {
        console.log('**** inside function_name of PersonController.js & data is ****', err);
      } else {
        callback(null, person);
      }
    });

  },

  deletePersonData: function (data, callback) {
    Person.destroy({
      id: data._id
    }).exec(function (err, deletedData) {
      if (err) {
        console.log('**** inside function_name of PersonController.js & data is ****', err);
      } else {
        callback(null, deletedData);
      }
    });

  },

};

module.exports = _.assign(model);
