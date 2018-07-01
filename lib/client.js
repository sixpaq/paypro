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
  createPayment({ consumerIban, amount, description, payMethod, consumerEmail, testMode, returnUrl, cancelUrl, postbackUrl }, cb) {
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
      'consumer_name': consumerName,
      'consumer_firstname': consumerFirstname,
      'consumer_account': consumerIban,
      'consumer_email': consumerEmail,
      'consumer_address': consumerAddress,
      'consumer_city': consumerCity,
      'test_mode': testMode,
      'return_url': returnUrl,
      'cancel_url': cancelUrl,
      'postback_url': postbackUrl,
    };
    console.log('paypro.createPayment', params);
    payPro(this.apiKey, command, params, cb);
  }
  
  /**
   * Creates a new payment for a Product in the PayPro system.
   * @param {object} params
   * @param {callback} cb 
   */
  createProductPayment({ productId, consumerIban, amount, description, payMethod, consumerEmail, testMode, returnUrl, cancelUrl, postbackUrl }, cb) {
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
      'consumer_name': consumerName,
      'consumer_firstname': consumerFirstname,
      'consumer_account': consumerIban,
      'consumer_email': consumerEmail,
      'consumer_address': consumerAddress,
      'consumer_city': consumerCity,
      'test_mode': testMode,
      'return_url': returnUrl,
      'cancel_url': cancelUrl,
      'postback_url': postbackUrl,
    };
    payPro(this.apiKey, command, params, cb);
  }
  
  /**
   * Gets details about a payment in the PayPro system.
   * @param {string} hash
   * @param {callback} cb 
   */
  getPayment(hash, cb) {
    const command = 'get_sale';
    
    const params = {
      'payment_hash': hash,
    };
    
    console.log('paypro.getPayment', params);
    payPro(this.apiKey, command, params, cb);
  }
}

module.exports = Client;
