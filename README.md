# PayPro Client
This module provides an easy to use interface for PayPro.

## Environment:
PAYPRO_KEY   = ***Your API key***

## Usage
```javascript
const Client = require('../lib/client');
const client = new Client();
```

or

```javascript
const Client = require('../lib/client');
const client = new Client({
  apiKey: '***Your API key***',
});
```

## CreatePayment
Creates a payment intended for a consumer

### Example
```javascript
const Client = require('../lib/client');

const client = new Client();
const payment = {
  productId: '12345',
  consumerIban: 'NL65INGB0000000000',
  consumerEmail: 'bogusemail@gmail.com',
  payMethod: 'ideal',
  bicCode: 'INGBNL2A',
  testMode: true,
  description: 'Voorbeeld Betaling',
  amount: 1.50,
};

client.createPayment(payment, (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(result);
});

```
