var mongoose = require('mongoose');
var md5 = require('md5');

var configSchema = new Schema({

  name: {
    type: 'string',
  },

  age: {
    type: 'string'
  }
});

var config = mongoose.model('Config', configSchema);

var model = {
  // what this function will do ?
  // req data --> ?
  uploadFile: function (filename, callback) {
    var d = new Date();
    var extension = filename.split('.').pop();

    //- generating unique filename with extension
    uuid = md5(d.getMilliseconds()) + "." + extension;

    //- seperate allowed and disallowed file types
    if (allowedTypes.indexOf(filename.headers['content-type']) === -1) {
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
        callback(null, uuid);
      }
    }


},


};








module.exports = _.assign(model);
