# erm-server

## Introduction
Express-Restify-Mongoose server (erm-server) is a node.js based approach to create a RESTful API server with a short period of time, it utilizes the library of express-restify-mongoose (https://github.com/florianholzapfel/express-restify-mongoose).

## Build

```
npm install
```
You will need to install mongodb as well

## Execution

```
node app.js
```

## Development
See `config.js` to define the port of the server and the URI of the mongodb. To build your own RESTful API, first you need to define the mongoose model in json format and put in `./mongoose-models`, the name of the json file will be the name of the collection, and the content will be the schema. Then start the server and that's it!
