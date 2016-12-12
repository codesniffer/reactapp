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
      count();
      break;
    case 'port':
      port();
      break;
    case 'protocol':
      protocol();
      break;
    case 'search':
      search();
      break;
    case 'scaninternet':
      scanInternet();
      break;
    case 'querysearch':
      querySearch();
      break;
		default:
			
	}
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
      //console.dir(rows);
    }

    var gridcolumns = [
      { name: 'item'},
      { name: 'highlight'}
    ]
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
    console.dir(gridcolumns)
    console.dir(gridRows);

    cb(gridRows);
  })
  .catch(err => {
    console.log('Error:');
    console.log(err);
  });
}

function count () {
  var countOpts = {
    facets: 'port:100,country:100',
  };
  client.count('freepbx port:5060', shodanKey, countOpts)
  .then(res => {
    console.log('Result:');
    console.log(util.inspect(res, { depth: 6 }));
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

function protocol () {
  client.protocols(shodanKey)
  .then(res => {
    console.log('Result:');
    console.log(util.inspect(res, { depth: 6 }));
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

function querySearch() {
  client.querySearch('webcam', shodanKey, { page: 2 })
  .then(res => {
    console.log('Result:');
    console.log(util.inspect(res, { depth: 6 }));
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