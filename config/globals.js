/**
 * Global Variable Configuration
 * (sails.config.globals)
 *
 * Configure which global variables which will be exposed
 * automatically by Sails.
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.globals.html
 */
module.exports.globals = {

  /****************************************************************************
   *                                                                           *
   * Expose the lodash installed in Sails core as a global variable. If this   *
   * is disabled, like any other node module you can always run npm install    *
   * lodash --save, then var _ = require('lodash') at the top of any file.     *
   *                                                                           *
   ****************************************************************************/

  _: true,

  /****************************************************************************
   *                                                                           *
   * Expose the async installed in Sails core as a global variable. If this is *
   * disabled, like any other node module you can always run npm install async *
   * --save, then var async = require('async') at the top of any file.         *
   *                                                                           *
   ****************************************************************************/

  async: false,

  /****************************************************************************
   *                                                                           *
   * Expose the sails instance representing your app. If this is disabled, you *
   * can still get access via req._sails.                                      *
   *                                                                           *
   ****************************************************************************/

  // sails: true,

  /****************************************************************************
   *                                                                           *
   * Expose each of your app's services as global variables (using their       *
   * "globalId"). E.g. a service defined in api/models/NaturalLanguage.js      *
   * would have a globalId of NaturalLanguage by default. If this is disabled, *
   * you can still access your services via sails.services.*                   *
   *                                                                           *
   ****************************************************************************/

  // services: true,

  /****************************************************************************
   *                                                                           *
   * Expose each of your app's models as global variables (using their         *
   * "globalId"). E.g. a model defined in api/models/User.js would have a      *
   * globalId of User by default. If this is disabled, you can still access    *
   * your models via sails.models.*.                                           *
   *                                                                           *
   ****************************************************************************/

  // models: true




};

// Mongoose Globals
global["mongoose"] = require('mongoose');
global["ObjectId"] = mongoose.Types.ObjectId;;
global["deepPopulate"] = require('mongoose-deep-populate')(mongoose);
global["uniqueValidator"] = require('mongoose-unique-validator');
global["timestamps"] = require('mongoose-timestamp');
global["validators"] = require('mongoose-validators');
global["monguurl"] = require('monguurl');
global["mongoose-schematypes-extend"] = require("mongoose-schematypes-extend");
// require('mongoose-middleware').initialize(mongoose);
global["mongoose-middleware"] = require("mongoose-middleware");
global["Schema"] = mongoose.Schema;
global["Grid"] = require('gridfs-stream');
global["gfs"] = Grid(mongoose.connection, mongoose);
global["http"] = require('http');
gfs.mongo = mongoose.mongo;
// global["mongoose-paginate"] = require("mongoose-paginate");

// Util Globals
global["moment"] = require("moment");
global["_"] = require('lodash');
global["request"] = require('request');
global["fs"] = require('fs');
global["async"] = require('async');


// Files to Import
global["jsFiles"] = require("../frontend/files.js");



// passport Globals
global["passport"] = require('passport');
global["LocalStrategy"] = require('passport-local').Strategy;
global["FacebookStrategy"] = require('passport-facebook').Strategy;


if (process.env.NODE_ENV && process.env.NODE_ENV === "production") {
  global["env"] = require("./env/production.js");
} else {
  global["env"] = require("./env/development.js");
}
