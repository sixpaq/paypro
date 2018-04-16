const debug = require('debug')('biccode');

const parseIban = new RegExp('^NL([0-9]{2})([A-Z]{4})([0-9]{10})$', 'i');

const bicCodes = [
  {
    bank: 'RABO',
    biccode: 'RABONL2U',
    name: 'Rabobank',
  }, {
    bank: 'INGB',
    biccode: 'INGBNL2A',
    name: 'ING Bank',
  }, {
    bank: 'ABNA',
    biccode: 'ABNANL2A',
    name: 'ABN AMRO',
  }, {
    bank: 'SNSB',
    biccode: 'SNSBNL2A',
    name: 'SNS Bank',
  }, {
    bank: 'RBRB',
    biccode: 'RBRBNL21',
    name: 'RegioBank',
  }, {
    bank: 'ASNB',
    biccode: 'ASNBNL21',
    name: 'ASN Bank',
  }, {
    bank: 'KNAB',
    biccode: 'KNABNL2H',
    name: 'Knab',
  }, {
    bank: 'TRIO',
    biccode: 'TRIONL2U',
    name: 'Triodos Bank',
  }, {
    bank: 'FVLB',
    biccode: 'FVLBNL22',
    name: 'van Lanschot',
  }, {
    bank: 'BUNQ',
    biccode: 'BUNQNL2A',
    name: 'Bunq',
  }
];

module.exports = (iban) => {
  const parsed = parseIban.exec(iban);
  if (!parsed) {
    debug(`Unable to parse IBAN ${iban}.`);
    return null;
  }
  
  const bank = parsed[2].toUpperCase();
  const details = bicCodes.filter(e => e.bank === bank);
  return details.length ? details[0].biccode : null;
};
