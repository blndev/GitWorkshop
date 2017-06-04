#!/usr/bin/env node

'use strict';

//PORT Environment Variable will be set from paas environments
var port = process.env.PORT || 8080;

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var pjson = require('../package.json');

var app = express();
app.use(bodyParser.json());

//preparation for feature feature_APIPath
var apiPath = '/messages';
//var apiPath = '/api/1/messages';
var apiPathMessagesReset = apiPath + '/all';

var messagesDB = [];

/* new function for branch "feature_basicWebClient"
//link the folder html to "/"
var htmlPath = path.join(__dirname, 'html');
console.log('use html from folder', htmlPath);
app.use(express.static(htmlPath));
*/

//replace by /help while implementing feature_basicWebClient
//app.get('/help', function(req, res) {
app.get('/', function(req, res) {
  res.send('Please use GET /messages/ to recieve messages and POST /messages/ to set some');
});

app.get('/version', function(req, res) {
  res.send(pjson.version);
});

app.get(apiPath, function(req, res) {
  res.send(messagesDB);
});

app.post(apiPath, function(req, res) {
  var data = req.body;
  if (!data.title || !data.body || !data.sender) {
    res.status(400).send('title, body and sender are required');
    res.end();
    return;
  }
  var newMessage = {
    id: Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000,
    created: new Date(),
    title: data.title,
    body: data.body,
    sender: data.sender
  };

  messagesDB.push(newMessage);
  res.send(newMessage);
  console.log('new message', JSON.stringify(newMessage, 0, 2));
});

app.delete(apiPathMessagesReset, function(req, res) {
  console.log('all messages deleted');
  messagesDB = [];
  res.end();
});

app.put(apiPath, function(req, res) {
  throw 'not implemented yet';
  //res.send('Got a DELETE request');
});

app.delete(apiPath, function(req, res) {
  throw 'not implemented yet';
  //res.send('Got a DELETE request');
});

var server = app.listen(port);
console.log('Example app listening at http://%s:%s', 'localhost', port);
