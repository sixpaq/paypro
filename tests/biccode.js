const assert = require('assert');

const biccode = require('../lib/biccode');

const a = biccode('NL00INGB0000000000');
assert.equal(a, 'INGBNL2A');

const b = biccode('NL00INGB000000000');
assert.equal(b, null);

const c = biccode('NL00ABNA0000000000');
assert.equal(c, 'ABNANL2A');
