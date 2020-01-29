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
$.getScript('public/dashboards/test.js');
$('head').append('<link rel="stylesheet" href="public/dashboards/custom.css" type="text/css" />');
$('head').append('<script src="public/dashboards/svg.js"></script>');

/*var mod = document.createElement("script")
mod.type = "module";
mod.innerHTML = "import {hello} from './myscript2.js'";
document.head.appendChild(mod);
//import { hello } from './myscript2';

var vjs = document.createElement("script");
vjs.type = "text/javascript"
vjs.src = "https://unpkg.com/vue"
document.head.appendChild(vjs);
var myscript = document.createElement("script")
myscript.type="text/javascript"
myscript.src = "public/dashboards/myscript2.js"
document.head.appendChild(myscript);
*/


// accessible variables in this scope
var window, document, ARGS, $, jQuery, moment, kbn;

// Setup some variables
var dashboard = [];

var mydashboards = [];
// All url parameters are available via the ARGS object
var ARGS;

// Initialize a skeleton with nothing but a rows array and service object
dashboard[0] = {
  rows : [],
};

let clients = [];

clients.push({
  name  : 'Alior',
  logo  : 'public/img/svg/alior-bank.svg'
});

clients.push({
  name  : 'PeKaO',
  logo  : 'public/img/svg/bank-pekao.svg'
});

clients.push({
  name  : 'Mbank',
  logo  : 'public/img/svg/mbank.svg'
});

// Set a title
dashboard[0].title = 'Scripted dash';

// Set default time
// time can be overridden in the url using from/to parameters, but this is
// handled automatically in grafana core during dashboard initialization
dashboard[0].time = {
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

/*
for (var i = 0; i < rows; i++) {

  dashboard.rows.push({
    title: 'Chart',
    height: '200px',
    collapse: true,
    panels: [
      {
        title: 'Events',
        type: 'graph',
        span: 12,
        fill: 1,
        linewidth: 2,
        targets: [
          {
            'target': "randomWalk('" + seriesName + "')"
          },
          {
            'target': "randomWalk('random walk2')"
          }
        ],
        seriesOverrides: [
          {
            alias: '/random/',
            yaxis: 2,
            fill: 0,
            linewidth: 5
          }
        ],
        tooltip: {
          shared: true
        }
      }
    ]
  });
}
*/

dashboard[0].links = [
	{
	      icon: "external link",
	      type: "link",
	      url: "http://127.0.0.1:3000/dashboard/script/scripted.js"
        }
]
function createContent(client) {
	let html = '<div class="box1"> \
			<a href="http://127.0.0.1:3000/dashboard/script/scripted.js"> \
				<img class="logo" src="'+client.logo+'"></img> \
			</a> \
		   </div> \
		   <div class="box2"> \
			<button class="button1">a1</button> \
			<button class="button1">a2</button> \
			<button class="button1">a3</button> \
		   </div>';
	return html;
}
function panel_tab() {
  
  var test = [];
  var panel_tab1= [];

  for ( var i=0; i<clients.length; i++) {
    test.push( {
      //title: clients[i].name,
      editable: true,
      type: 'text',
      span: 4,
      mode: 'html',
      height: '200px',
      content: createContent(clients[i])
        }/*,{
      title: "haha" + i,
      editable: true,
      type: 'graph',
      span: 4,
      mode: 'text',
      height: '10px'   
    }*/)
  }

  return {
    title:  'abcd',
    collapse: false,
   
    panels: test
  }
}
dashboard[0].rows.push(panel_tab());

console.log(dashboard[0]);

return dashboard[0];
