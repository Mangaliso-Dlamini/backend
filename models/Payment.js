const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    amount: Number,
    currency: String,
    paid: { type: Boolean, default: false },
    description: String,
    created_at: { type: Date, default: Date.now },
});
  
module.exports = mongoose.model('Payment', PaymentSchema);