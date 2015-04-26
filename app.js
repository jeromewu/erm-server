var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var restify = require('express-restify-mongoose');
var config = require('./config');
var mongooseInstantiator = require('./mongoose-instantiator');
var Schema = mongoose.Schema;

var app = express();

mongoose.connect(config.mongodb_uri);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());

var mongoose_models = mongooseInstantiator(mongoose, config);

var router = express.Router();
for(var i=0;i<mongoose_models.length;i++){
  restify.serve(router, mongoose_models[i]);
}
app.use(router);

app.listen(config.port, function(){
  console.log("Express-Restify-Mongoose server listening on port 3000");
});
