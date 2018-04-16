const payPro = require('./core');
const bic = require('./biccode');

class Client {
  constructor(options) {
      this.options = options || {};
      this.apiKey = this.options.apiKey || process.env.PAYPRO_KEY;
  }
  
  /**
   * Creates a new payment in the PayPro system.
   * @param {object} params
   * @param {callback} cb 
   */
  createPayment({ consumerIban, amount, description, payMethod, consumerEmail, testMode }, cb) {
    const command = 'create_payment';
    
    if (payMethod === 'ideal') {
      /**
       * Get the biccode from the ibannumber
       */
      const bicCode = bic(consumerIban);
      payMethod = `ideal/${bicCode}`;
    }

    const params = {
      'amount': Math.round(amount * 100),
      'description': description,
      'pay_method': payMethod,
      'consumer_account': consumerIban,
      'consumer_email': consumerEmail,
      'test_mode': testMode,
    };
    payPro(this.apiKey, command, params, cb);
  }
  
  /**
   * Creates a new payment for a Product in the PayPro system.
   * @param {object} params
   * @param {callback} cb 
   */
  createProductPayment({ productId, consumerIban, amount, description, payMethod, consumerEmail, testMode }, cb) {
    const command = 'create_product_payment';
    
    if (payMethod === 'ideal') {
      /**
       * Get the biccode from the ibannumber
       */
      const bicCode = bic(consumerIban);
      payMethod = `ideal/${bicCode}`;
    }

    const params = {
      'amount': Math.round(amount * 100),
      'description': description,
      'product_id': productId,
      'pay_method': payMethod,
      'consumer_account': consumerIban,
      'consumer_email': consumerEmail,
      'test_mode': testMode,
    };
    payPro(this.apiKey, command, params, cb);
  }
}

module.exports = Client;
