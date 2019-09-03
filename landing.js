'use strict';
var debug = require('debug')('landing');
var util = require('util');
var tool = require('leaptool');

module.exports = function(app) {

  var module_name = 'landing';
  app.eventEmitter.emit('extension::init', module_name);

  var block = tool.object(require('base')(app, module_name));
  block.role = 'user';
  block.description ='landing module',
  block.tags = ['landing'];
  block.depends = [];

  block.data = tool.object(require('basedata')(app, module_name));
  block.page = tool.object(require('basepage')(app, module_name, block.data));

  block.model = null;
  block.option = null;

  block.test = function() {
    return 'landing test';
  };

  // page
  block.page.index = function(req, res) {
    var page = app.getPage(req, { title:'landing' });
    res.render('landing/index', { page:page });
  };

  block.page.admin = function(req, res) {
    var page = app.getPage(req, { title:'landing admin' });
    res.render('landing/admin', { page:page });
  };

  // page route
  app.server.get('/', block.page.index);
  app.server.all('/admin/*', block.page.checkAdminLogin);
  app.server.get('/admin/landing', block.page.admin);

  return block;
};
