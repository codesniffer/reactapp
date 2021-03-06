'use strict';

var reqHttp = require('request');
import viewData from './censys-view-response.json';


var ExportMethods = {};

ExportMethods.performAction  = function (action, cb) {
	switch (action) {
	case 'search':
      search(cb);
	  break;
    case 'view':
      view(cb);
      break;
    case 'report':
      report(cb);
      break;
	default:
			
	}
}

function generateRows (rows) {

   var gridRows = [];
    for (var j =0; j< rows.length; j++) {
      var obj = rows[j];
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) { 
          var gridRow = {};
          gridRow.item = prop;
          gridRow.highlight = obj[prop].toString();
          gridRows.push(gridRow);
        }
      }
    }
  return gridRows;
}

function searchBack (cb) {
    console.log('--------- Invoking HTTP Request --------');
    reqHttp({
        url: 'https://www.censys.io/api/v1/search/ipv4',
        method: 'POST',
        body: {query : 'www.censys.io', page : 2},
        json: true,
        auth: {
            user: 'b1ee0e59-6ef7-4908-8766-55611f6bbcde',
            pass: 'Ycva5PsVxIa1trLX5nbK4gpQClC4UGf4'
        }
    }, (error, response, body) => {
        if (error || response.statusCode != 200) {
            console.log(error); 
        }
        else {

        	console.dir(body);
        }
    });
};

function search (cb) {
	var res = viewData;
	var rows = [];
	for(var i =0; i< res.results.length; i++) {
		for(var j=0; j< res.results[i].protocols.length; j++) {
			var trow = {};
			trow.ip = res.results[i].ip;
			trow.protocol = res.results[i].protocols[j];
			rows.push(trow);
		}
		console.dir(rows);
	}
	cb(generateRows(rows));	
}

function view2 (cb) {
    console.log('--------- Invoking HTTP Request --------');
    reqHttp({
        url: 'https://www.censys.io/api/v1/view/websites/google.com',
        method: 'GET',
        json: true,
        auth: {
            user: 'b1ee0e59-6ef7-4908-8766-55611f6bbcde',
            pass: 'Ycva5PsVxIa1trLX5nbK4gpQClC4UGf4'
        },
    }, (error, response, body) => {
        if (error || response.statusCode != 200) {
            console.log(error); 
        }
        else {

        	console.dir(body);
        }
    });
};

function report (cb) {
    console.log('--------- Invoking HTTP Request --------');
    reqHttp({
        url: 'https://www.censys.io/api/v1/search/ipv4',
        method: 'POST',
        body: {query : 'www.censys.io', page : 2},
        json: true,
        auth: {
            user: 'b1ee0e59-6ef7-4908-8766-55611f6bbcde',
            pass: 'Ycva5PsVxIa1trLX5nbK4gpQClC4UGf4'
        }
    }, (error, response, body) => {
        if (error || response.statusCode != 200) {
            console.log(error); 
        }
        else {

        	console.dir(body);
        }
    });
};

module.exports = ExportMethods;




