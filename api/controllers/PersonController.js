/**
 * PersonController
 *
 * @description :: Server-side logic for managing Customers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var mongoose = require('mongoose');
 
// require('mongoose-middleware').initialize({
//   maxDocs : 1000
// }, mongoose);

var controller = {
  createPerson: function (req, res) {
    Person.create({
      name: req.body.name,
      age: req.body.age,
      userId: req.body.userId
    }).exec(function (err, person) {
      if (err) {
        res.send("Error:Sorry!Something went Wrong");
        console.log('**** inside function_name of PersonController.js & data is ****', err);
      } else {
        res.send("Successfully Created!");
      }
    });
  },

  temp: function (req, res) {
    if (req.body) {
      Person.temp(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: {
          message: 'Invalid Request'
        }
      })
    }
  },

  view: function (req, res) {
    Person.find().exec(function (err, persons) {
      console.log('**** inside function_name of PersonController.js & data is ****', persons);
      if (err) {
        res.send("Error:Sorry!Something went Wrong");
      } else {
        res.send(persons);
      }

    });
  },

  // update: function (req, res) {
  //   var id = req.body._id;
  //   console.log('****!!!!!!!!!!!!!!!!!!!!!!!1 ****', id);
  //   Person.find(id).exec(function (err, model) {
  //     console.log('**** i@@@@@@@@@@@@@@@@@@@@@@@@@ ****', model);

  //     if (req.method == "PUT") {
  //       model.name = req.body.name;
  //       model.age = req.body.age;
  //       model.save(function (err) {

  //         if (err) {
  //           res.send("Error");
  //         } else {
  //           res.redirect('person/update/' + model.id);
  //         }

  //       });

  //     } else {
  //       res.render('person/update', {
  //         'model': model
  //       });
  //     }
  //   });
  // },

  delete: function (req, res) {
    console.log('**** inside @@@@@@@@@@@@@@@@@@@@@!!!!!!!!!!!!!!!1 ****', req.body);
    Person.destroy({
      id: req.body._id
    }).exec(function (err, deletedData) {
      if (err) {
        return res.negotiate(err);
      }
      sails.log('Successfully Deleted !!!');
      return res.ok(deletedData);
    });
  },

  findAllData: function (req, res) {
    console.log('**** !!!!!!!!!!!!!!!!!!!!!!1');
    if (req.body) {
      console.log('**** inside function_name of PersonController.js & data is ****', req.body);
      Person.findAllData(req.body, res.callback);
    } else {
      console.log('****$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
      res.json({
        value: false,
        data: {
          message: 'Invalid Request'
        }
      })
    }
  },

  insertData: function (req, res) {
    console.log('***%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
    if (req.body) {
      Person.insertData(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: {
          message: 'Invalid Request'
        }
      })
    }
  },

  deletePersonData: function (req, res) {
    if (req.body) {
      Person.deletePersonData(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: {
          message: 'Invalid Request'
        }
      })
    }
  },

  uploadAvtar: function (req, res) {
    if (req.file) {
      Person.uploadAvtar(req.file, res.callback);
    } else {
      res.json({
        value: false,
        data: {
          message: 'Invalid Request'
        }
      })
    }
  },

  search: function (req, res) {
    if (req.body) {
      Person.search(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: {
          message: 'Invalid Request'
        }
      })
    }
  },
};

module.exports = _.assign(controller);
