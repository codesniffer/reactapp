'use strict';

const util = require('util');

const client = require('shodan-client');

const shodanKey = 'tRLde5KXScaemF7GLU0Ig0Jh6J1p4pFE';


var ExportMethods = {};

ExportMethods.performAction  = function (action) {
	switch (action) {
		case 'host':
      host ();
			break;
    case 'count':
      break;
    case 'port':
      break;
    case 'protocol':
      break;
		default:
			
	}
}

function host () {
  client.host('1.1.1.1', shodanKey)
  .then(res => {
    console.log('Result:');
    console.log(util.inspect(res, { depth: 6 }));
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
client.scanInternet(5065, 'sip', shodanKey)
.then(res => {
  console.log('Result:');
  console.log(util.inspect(res, { depth: 6 }));
})
.catch(err => {
  console.log('Error:');
  console.log(err);
});

// QUERY SEARCH
client.querySearch('webcam', shodanKey, { page: 2 })
.then(res => {
  console.log('Result:');
  console.log(util.inspect(res, { depth: 6 }));
})
.catch(err => {
  console.log('Error:');
  console.log(err);
});

*/



module.exports = ExportMethods;