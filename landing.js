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

  block.model = {
    name: { type: 'string' },
    type: { type: 'string' },
    content: { type: 'text' },
    note: {
      type: 'object',
      subtype: {
        type: 'json'
      }
    },
    photo: {
      type: 'file'
    },
    images: {
      type: 'array',
      subtype: {
        type: 'file'
      }
    },
    status: {
      type: 'string',
      values: [
        { display:'Active', value:'active', default:true },
        { display:'Inactive', value:'inactive' }
      ]
    },
    create_by: { type: 'string', config:{ auto:true } },
    create_date: { type: 'date', config:{ auto:true } },
    edit_by: { type: 'string', config:{ auto:true } },
    edit_date: { type: 'date', config:{ auto:true } }
  };

  block.option = {
    edit_fields: ['name', 'type'],
    list_fields: ['name', 'type'],
    search_fields: ['name', 'type']
  };

  block.test = function() {
    return 'landing test';
  };
  
  // page
  block.page.index = function(req, res) {
    var page = app.getPage(req, { title:'landing' });
    res.render('landing/index', { page:page });
  };
  
  block.page.test = function(req, res) {
    var callback = arguments[3] || null;
    var parameter = tool.getReqParameter(req);
    debug('landing test parameter:', parameter);
    var data = { value:block.test() };
    app.sendJsonData(req, res, data);
  };
  
  // page route
  app.server.get('/landing', block.page.index);
  app.server.get('/landing/test', block.page.test);

  return block;
};
