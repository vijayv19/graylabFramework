/**
 * Person.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var mongoose = require('mongoose');

var personSchema = new Schema({

  name: {
    type: String,
    required: true
  },

  age: {
    type: Number
  },
  
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },

});
personSchema.plugin(deepPopulate, {});

module.exports = mongoose.model('Person', personSchema);

var model = {

  findAllData: function (data, callback) {
    Person.find().exec(function (err, found) {
      if (err) {
        console.log('**** error at function_name of Person.js ****', err);
        callback(err, null);
      } else if (_.isEmpty(found)) {
        callback(null, 'no data found');
      } else {
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
    var uuid = '';

    data("file").upload({
      maxBytes: 10000000, // 10 MB Storage 1 MB = 10^6
      dirname: "../../assets/images",
    }, function (err, uploadedFile) {
      if (err) {
        callback('error at uploadAvtar', err);
      } else if (uploadedFile.length > 0) {
        var getAllFilesId = [];
        async.concat(uploadedFile, function (n, callback) {

          Person.uploadFile(n, function (err, value) {

            // console.log('**** inside %%%%%%%%%%%%%%%%%%%%% of Person.js ****',value);
            getAllFilesId.push(value);
            // if (err) {
            //   callback(err);
            // } else {
            //   callback();
            // }

            callback();
          });

        }, function (err, finalData) {
          console.log('**** inside %%%%%%%%%%%%%%%%%%%%% of Person.js ****', getAllFilesId);
          callback(null, getAllFilesId);
        });

      } else {
        callback(null, {
          value: false,
          data: "No files selected"
        });
      }
    });
  },

  uploadFile: function (file, callback) {
    var d = new Date();
    var extension = file.filename.split('.').pop();
    var allowedTypes = ['image/jpeg', 'image/png'];
    uuid = file.fd.split('/').pop();

    if (allowedTypes) {
      callback(null, uuid);
    } else {
      callback(null, uuid);
    }
  },

  search: function (data, callback) {
    console.log('****^^^^^^^^^^^^^^^^^ ****', data);
    var Model = this;
    var Const = this(data);
    var maxRow = data.maxRow;
    console.log('**** !!!!!!!!!!!!! ****', Model);
    console.log('**** @@@@@@@@@@@@@@ ****', Const);
    var page = 1;
    if (data.page) {
      page = data.page;
    }
    var field = data.field;

    var options = {
      field: data.field,
      filters: {
        keyword: {
          fields: [data.fieldName],
          term: data.keyword
        }
      },
      sort: {
        desc: 'createdAt'
      },
      start: (page - 1) * maxRow,
      count: maxRow
    };

    if (defaultSort) {
      if (defaultSortOrder && defaultSortOrder === "desc") {
        options.sort = {
          desc: defaultSort
        };
      } else {
        options.sort = {
          asc: defaultSort
        };
      }
    }

    var Search = Model.find(data.filter)

      .order(options)
      .deepPopulate(deepSearch)
      .keyword(options)
      .page(options, callback);

  },


  // what this function will do ?
  // req data --> ?
  temp: function (data, callback) {
    // Person.create({
    //   name: data.name,
    //   age: data.age,
    //   userId: data.userId
    // }).exec(function (err, person) {

    //   // Error handling
    //   if (err) {
    //     res.send("Error:Sorry!Something went Wrong");
    //     console.log('**** inside function_name of PersonController.js & data is ****', err);
    //   } else {
    //     // console.log('**** Successfully Created!@@@@@@@@@@@@ ****');
    //     res.send("Successfully Created!");
    //     // res.send(person);
    //     // res.redirect( 'person/view/'+model.id);
    //   }
    // });


    var person = new Person(req.body);  
    person.save((err, createdTodoObject) => {  
        if (err) {
            res.status(500).send(err);
        }
        // This createdTodoObject is the same one we saved, but after Mongo
        // added its additional properties like _id.
        res.status(200).send(createdTodoObject);
    });


  },


};

module.exports = _.assign(model);
