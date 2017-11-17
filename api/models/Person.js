/**
 * Person.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var mongoose = require('mongoose');
var md5 = require('md5');

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

  // upload the avtar 
  // req data --files
  uploadAvtar: function (data, callback) {
    //- setting allowed file types

    //- path to store uploaded files
    var allowedDir = "../../assets/images";
    var uuid = '';

    data("file").upload({
      maxBytes: 10000000 // 10 MB Storage 1 MB = 10^6
    }, function (err, uploadedFile) {
      // console.log(err);
      // console.log(uploadedFile);
      if (err) {
        callback('error at uploadAvtar', err);
      } else if (uploadedFile.length > 0) {
        async.concat(uploadedFile, function (n, callback) {
          Person.uploadFile(n, function (err, value) {
            if (err) {
              callback(err);
            } else {
              callback(null, value.name);
            }
          });
        }, callback);
      } else {
        callback(null, {
          value: false,
          data: "No files selected"
        });
      }
    });
  },



  //   var d = new Date();
  //   var extension = data.filename.split('.').pop();

  //   //- generating unique filename with extension
  //   uuid = md5(d.getMilliseconds()) + "." + extension;

  //   //- seperate allowed and disallowed file types
  //   if (allowedTypes.indexOf(data.headers['content-type']) === -1) {
  //     //- save as disallowed files default upload path
  //     callback(null, uuid);
  //   } else {
  //     //- save as allowed files
  //     callback(null, allowedDir + "/" + uuid);
  //   }
  // },
  // function whenDone(err, file) {
  //   if (err) {
  //     console.log('****error in uploadAvtar****', err);
  //   } else {
  //     callback(null, uuid);
  //   }
  // });


  uploadFile: function (data, callback) {
    // console.log('**** !!!!!!!!!!!!!!!! ****',filename);
    var d = new Date();
    var allowedDir = "../../assets/images";    
    var extension = data.filename.split('.').pop();
    var allowedTypes = ['image/jpeg', 'image/png'];

    //- generating unique filename with extension
    uuid = md5(d.getMilliseconds()) + "." + extension;
    // console.log('****!!!!!!!!!!!!!!!!! ****', uuid);
    //- seperate allowed and disallowed file types
    if (uuid) {
      //- save as disallowed files default upload path
      callback(null, uuid);
    } else {
      //- save as allowed files
      callback(null, allowedDir + "/" + uuid);
    }

    function whenDone(err, file) {
      if (err) {
        console.log('****error in uploadAvtar****', err);
      } else {
        callback(null, file);
      }
    }
  },




};

module.exports = _.assign(model);
