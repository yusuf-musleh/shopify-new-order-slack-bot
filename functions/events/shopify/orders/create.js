const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

/**
* An HTTP endpoint that acts as a webhook for Shopify orders.create event
* @param {object} event
* @returns {object} result Your return value
*/
module.exports = async (event) => {
  let result = {};

  await lib.slack.channels['@0.6.7'].messages.create({
    channel: `#general`,
    text: `A new order of *$${event.total_price_usd}* has been placed by ${event.customer.email}!`,
    attachments: event.line_items.map((item) => {
      return {
        'title': item.title,
        'text': `Price: $${item.price}\nQuantity: ${item.quantity}`,
        'color': '#4fbc4d'
      }
    })
  });
  
  return result;
};