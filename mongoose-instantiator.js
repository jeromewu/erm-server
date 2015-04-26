var fs=require('fs');

function read_mongoose_models(mongoose_models_dir){
  var done = false;

  var models = [];
  fs.readdir(mongoose_models_dir, function(err, files){
    if(err) throw err;
    files.forEach(function(file){
      fs.readFile(mongoose_models_dir+'/'+file, 'utf-8', function(err, json_text){
        if(err) throw err;
        var model_name = file.slice(0, -5);
        var model_schema = JSON.parse(json_text);
        models.push({name: model_name, schema: model_schema});
        if(models.length == files.length){
          done = true;
        }
      });
    
    });
  });
  while(!done) {
    require('deasync').runLoopOnce();
  }

  return models;
}

function instantiate_mongoose_models(mongoose, models){
  var mongoose_models = [];
  for(var i=0;i<models.length;i++){
    var schema = new mongoose.Schema(models[i].schema);
    var model = mongoose.model(models[i].name, schema);
    mongoose_models.push(model);
  }
  return mongoose_models;
}

module.exports = function(mongoose, config){
  var models = read_mongoose_models(config.mongoose_models_dir);
  var mongoose_models = instantiate_mongoose_models(mongoose, models);
  return mongoose_models;
}
