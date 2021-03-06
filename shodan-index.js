'use strict';

const util = require('util');
const client = require('shodan-client');
var _ = require('lodash');


const shodanKey = 'tRLde5KXScaemF7GLU0Ig0Jh6J1p4pFE'; 


var ExportMethods = {};

ExportMethods.performAction  = function (action, cb) {
	switch (action) {
		case 'host':
      host (cb);
			break;
    case 'count':
      count(cb);
      break;
    case 'port':
      port();
      break;
    case 'protocol':
      protocol(cb);
      break;
    case 'search':
      search();
      break;
    case 'scaninternet':
      scanInternet();
      break;
    case 'querysearch':
      querySearch(cb);
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

function host (cb) {
  client.host('138.26.64.12', shodanKey)
  .then(res => {
    //console.log('Result:');
    //console.log(util.inspect(res.data, { depth: 6 }));

    var nameKeys = ['hostnames', 'ip_str', 'isp', 'product', 'version', 'port', 'transport'];
    var rows = []
    for (var i = 0; i < res.data.length; i++) {
      var item = res.data[i];
      var row = _.pick(item,nameKeys);
      rows.push(row)
    }
    cb(generateRows(rows));

  })
  .catch(err => {
    console.log('Error:');
    console.log(err);
  });
}

function count (cb) {
  var countOpts = {
    //facets: 'port:100,country:100',
    query: 'asterisk',
    facets: 'port:100',
    page: 1,
  };
  client.count('asterisk', shodanKey, countOpts)
  .then(res => {
    var nameKeys = ['count', 'value'];
    var rows = []
    for (var i = 0; i < res.facets.port.length; i++) {
      var item = res.facets.port[i];
      var row = _.pick(item,nameKeys);
      rows.push(row)
    }


    cb(generateRows(rows));
    
  })
}

function port () {
  client.ports(shodanKey)
  .then(res => {
    console.log('Result:');
    console.log(util.inspect(res, { depth: 6 }));
  })
  .catch(err => {
    console.log('Error:');
    console.log(err);
  });
}

function protocol (cb) {
  client.protocols(shodanKey)
  .then(res => {
    var gridRows = [];
    gridRows.push(res);
    cb(generateRows(gridRows));
  })
  .catch(err => {
    console.log('Error:');
    console.log(err);
  });
}

function search() {
  var searchOpts = {
    query: 'asterisk',
    facets: 'port:100',
    page: 1,
  };

  client.exploits.search('asterisk', shodanKey, searchOpts)
  .then(res => {
    console.log('Result:');
    console.log(util.inspect(res, { depth: 6 }));
  })
  .catch(err => {
    console.log('Error:');
    console.log(err);
  });
}

function scanInternet() {
  client.scanInternet(5065, 'sip', shodanKey)
  .then(res => {
    console.log('Result:');
    console.log(util.inspect(res, { depth: 6 }));
  })
  .catch(err => {
    console.log('Error:');
    console.log(err);
  });
}

function querySearch(cb) {
  client.querySearch('webcam camera', shodanKey, { page: 2 })
  .then(res => {
    console.log('Result:');
    console.log(util.inspect(res, { depth: 6 }));

    var nameKeys = ['title', 'description', 'query', 'votes'];
    var rows = []
    for (var i = 0; i < res.matches.length; i++) {
      var item = res.matches[i];
      var row = _.pick(item,nameKeys);
      rows.push(row)
    }

    cb(generateRows(rows));
  })
  .catch(err => {
    console.log('Error:');
    console.log(err);
  });


}

/*


// SEARCH
const searchOpts = {
  facets: 'port:100,country:100',
  // minify: false,
};
client.search('asterisk port:5061', shodanKey, searchOpts)
.then(res => {
  console.log('Result:');
  console.log(util.inspect(res, { depth: 6 }));
})
.catch(err => {
  console.log('Error:');
  console.log(err);
});

// SCAN INTERNET


// QUERY SEARCH


*/



module.exports = ExportMethods;