
var controller = {

  search: function (req, res) {
    var data = req.body,
      callback = res.callback

    var maxRow = 10;
    if (data.totalRecords) {
      maxRow = data.totalRecords;
    }

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

    // var perPage = 3
    // var page = req.params.page || 1

    // Person.find({})
    //   .order(options)
    //   .skip(options)
    //   .limit(options)
    //   .exec(function (err, found) {
    //     if (err) {
    //       console.log('**** error at function_name of WebController.js ****', err);
    //       callback(err, null);
    //     } else if (_.isEmpty(found)) {
    //       callback(null, []);
    //     } else {
    //       callback(null, found);
    //     }
      // });
  // },


    Person.find().sort({
        createdAt: -1
      })
      .order(options)
      .keyword(options)
      .page(options,
        function (err, found) {
          if (err) {
            console.log('**** error at search of Customer.js ****', err);
            callback(err, null);
          } else if (_.isEmpty(found)) {
            callback(null, 'noDataFound');
          } else {
            callback(null, found);
          }
        });
  },


  delRestrictions: function (req, res) {
    callback = res.callback;
    var modelName = req.url.split("/").pop();

    if (modelName == 'Customer') {
        var myModel = [{
            models: "",
            fieldName: [""]
        }]
    }
    if (modelName == 'Person') {
        var myModel = [{
            models: "",
            fieldName: [""]
        }]
    }
    var allDependency = [];
    async.eachSeries(req.body.idsArray, function (ids, callback) {
            async.eachSeries(myModel, function (m, callback) {
                    async.eachSeries(m.fieldName, function (f, callback) {
                            this[m.models].findOne({
                                [f]: ids
                            }).select('_id').lean().exec(function (err, found) {
                                if (err) {
                                    console.log('**** error at delRestrictions ****', err);
                                    callback(err, null);
                                } else if (_.isEmpty(found)) {
                                    console.log(' no dependency of the table ' + m.models + ' with attribute ' + [f]);
                                    callback(null, []);
                                } else if ([f] == "" || "") {
                                    callback(null, []);
                                } else {
                                    allDependency.push({
                                        model: m.models,
                                        fieldName: f,
                                        _id: found,
                                        for_id: ids
                                    });
                                    console.log('dependency of the table ' + m.models + ' with attribute ' + [f]);
                                    callback();
                                }
                            });
                        },
                        function (err) {
                            if (err) {
                                console.log('***** error at final response of async.eachSeries in function_name of MMaterial.js*****', err);
                            } else {
                                callback();
                            }
                        });
                },
                function (err) {
                    if (err) {
                        console.log('**** error at delRestrictions ****', err);
                    } else {
                        if (_.isEmpty(allDependency)) {
                            this[modelName].remove({
                                _id: ids
                            }).lean().exec(function (err, found1) {
                                if (err) {
                                    console.log('**** error at function_name of MMaterial.js ****', err);
                                    callback(err, null);
                                } else if (_.isEmpty(found1)) {
                                    callback(null, []);
                                } else {
                                    callback(null, found1);
                                }
                            });
                        } else {
                            async.eachSeries(myModel, function (m, callback) {
                                    if (m.base == true) {
                                        var myId = _.map(allDependency, '_id._id');
                                        this[m.models].findOneAndUpdate({
                                            _id: myId
                                        }, {
                                            $pull: {
                                                [m.fieldName]: ids
                                            },
                                        }).exec(function (err, updatedData) {
                                            if (err) {
                                                console.log('**** error at function_name of WebController.js ****', err);
                                                callback(err, null);
                                            } else if (_.isEmpty(updatedData)) {
                                                callback(null, []);
                                            } else {
                                                this[modelName].remove({
                                                    _id: ids
                                                }).lean().exec(function (err, found2) {
                                                    if (err) {
                                                        console.log('**** error at function_name of MMaterial.js ****', err);
                                                        callback(err, null);
                                                    } else if (_.isEmpty(found2)) {
                                                        callback(null, []);
                                                    } else {
                                                        callback(null, found2);
                                                    }
                                                });
                                            }
                                        });
                                    } else {
                                        callback(null, allDependency);
                                    }
                                },
                                function (err) {
                                    if (err) {
                                        console.log('***** error at final response of async.eachSeries in function_name of WebController.js*****', err);
                                    } else {
                                        callback();
                                    }
                                });
                        }
                    }
                });
        },
        function (err) {
            if (err) {
                console.log('***** error at final response of async.eachSeries in function_name of WebController.js*****', err);
            } else {
                callback(null, allDependency);
            }
        });
},

};
module.exports = _.assign(controller);
