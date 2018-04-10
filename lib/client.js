const payPro = require('./core');

class Client {
    constructor(options) {
        this.options = options || {};
        this.apiKey = this.options.apiKey || process.env.PAYPRO_KEY;
    }
    
    createPayment({ productId, consumerIban, amount, description, payMethod, bicCode, consumerEmail, testMode }, cb) {
      const command = 'create_product_payment';
      const params = {
        'amount': Math.round(amount * 100),
        'description': description,
        'product_id': productId,
        'pay_method': `${payMethod}/${bicCode}`,
        'consumer_account': consumerIban,
        'consumer_email': consumerEmail,
        'test_mode': testMode,
      };
      payPro(this.apiKey, command, params, cb);
    }
}

module.exports = Client;
