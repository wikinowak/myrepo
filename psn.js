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

// accessible variables in this scope
var window, document, ARGS, $, jQuery, moment, kbn;

// Setup some variables
var dashboard;

// All url parameters are available via the ARGS object
var ARGS;

// Initialize a skeleton with nothing but a rows array and service object
dashboard = {
  rows : [],
};

// Set a title
dashboard.title = 'Scripted dash';

// Set default time
// time can be overridden in the url using from/to parameters, but this is
// handled automatically in grafana core during dashboard initialization
dashboard.time = {
  from: "now-6h",
  to: "now"
};

var rows = 1;
var seriesName = 'argName';

if(!_.isUndefined(ARGS.rows)) {
  rows = parseInt(ARGS.rows, 10);
}

if(!_.isUndefined(ARGS.name)) {
  seriesName = ARGS.name;
}

class PanelStat {
  constructor(name) {
    this.datasource = null,
    this.type = 'stat'
    this.title  = name,

    this.editable = false //???
    
  }
}

let psn1 = new PanelStat(null)
let psn2 = new PanelStat("xxx")
let psn3 = new PanelStat("yyy")

let client = [
  {
    "datasource": null,
    "type": "stat",
    "title": "psn ",
    
    "editable": true,
    "id": 12,
    "timeFrom": null,
    "timeShift": null,
    "options": {
      "graphMode": "area",
      "colorMode": "background",
      "justifyMode": "center",
      "fieldOptions": {
        "values": false,
        "calcs": [
          "mean"
        ],
        "defaults": {
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "value": 50,
                "color": "#EAB839"
              },
              {
                "value": 75,
                "color": "#6ED0E0"
              }
            ]
          },
          "mappings": []
        },
        "overrides": []
      },
      "orientation": "vertical"
    },
    "pluginVersion": "6.6.0",
    "description": "hohoho"
  },
]
client.push(psn1)
client.push(psn2)
client.push(psn3)


  dashboard.rows.push({
    title: 'Chart',
    height: '300px',
    panels: client
  });


return dashboard;
