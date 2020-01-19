/* global _ */

/*
 * Complex scripted dashboard
 * This script generates a dashboard object that Grafana can load. It also takes a number of user
 * supplied URL parameters (in the ARGS variable)
 *
 * Return a dashboard object, or a function
 *
 * For async scripts, return a function, this function must take a single callback function as argument,
 * call this callback function with the dashboard object (look at scripted_async.js for an example)
 */

'use strict';

$('head').append('<link rel="stylesheet" href="public/dashboards/custom.css" type="text/css" />')

// accessible variables in this scope
var window, document, ARGS, $, jQuery, moment, kbn;

// Setup some variables
var dashboard;

// All url parameters are available via the ARGS object
var ARGS;

// Initialize a skeleton with nothing but a rows array and service object
dashboard = {
  rows: [],
};

// Set a title
dashboard.title = 'ZOO Scripted dashboard';

// Set default time
// time can be overridden in the url using from/to parameters, but this is
// handled automatically in grafana core during dashboard initialization
dashboard.time = {
  from: "now-6h",
  to: "now"
};

var rows = 1;
var seriesName = 'argName';

if (!_.isUndefined(ARGS.rows)) {
  rows = parseInt(ARGS.rows, 10);
}

if (!_.isUndefined(ARGS.name)) {
  seriesName = ARGS.name;
}

// Logo 

function custom_text_panel(options) {

  let text_panel = {
    //title:  "Logo",
    editable: true,
    type: 'text',
    span: 3,
    mode: 'html',
    height: '200px',
    content: options
  };

  return text_panel;
}

function create_text_panels() {

  let text_panels_tab = [];

  // Logo content
  let logo_content = '\
  <div class="img_box"> \
    <img class="logo" src="public/img/pko.svg"></img> \
  </div>'

  let text_panel = custom_text_panel(logo_content);

  text_panels_tab.push(text_panel);

  return text_panels_tab;

}

function create_graph_panels() {

}

function create_panels() {

  let panels_array = create_text_panels();
  panels_array.concat(create_text_panels());

  return {
    title: 'xyz',
    height: '300px',
    editable: true,
    panels:   panels_array
  }
}

dashboard.rows.push(create_panels());

return dashboard;
