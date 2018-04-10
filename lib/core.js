/*eslint-disable eqeqeq */
const request = require('request');
const debug = require('debug')('paypro:core');

function payPro(api_key, command, params, cb) {
  const options = {
    url: process.env.PAYPRO_URL || 'https://www.paypro.nl/post_api/',
    method: 'POST',
    form: {
      'apikey': api_key,
      'command': command,
      'params': JSON.stringify(params),
    },
  };

  debug(options);
  request(options, (err, res, b) => {
    if (err) {
      console.error(err);
      return cb(err);
    }
    
    const body = JSON.parse(res['body']);
    const errors = body.errors == 'true';
    const result = body.return;

    if (result == 'API key not valid' || errors) {
      cb({ message: result });
    } else if (!errors && res.statusCode == 200) {
      cb(null, result);
    } else {
      cb(body);
    }
  });
};

module.exports = payPro;
