const paypal = require('@paypal/checkout-server-sdk');

let clientId = "ARnRGPOvNwa-UbZuZWOM1lSnmQBPwUSnpVDkElZyMeM6jUjjf8-h1GBznFMaCllmIT5c-cPMxS5QVYfi";
let clientSecret = "EMGb217diaDD30cbGNYAHVNu6RsqDjBi5Gk4pbuSuiFkzk5cLv4sEiGrpTZm6KUZU8UWQsCAGTxQ0_2O";

let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

module.exports = { client };
