const Payment = require('../models/Payment');

async function getAllPayments() {
    try {
        const payments = await Payment.find();
        return payments;
    } catch (error) {
        console.error('Error fetching payments:', error);
        throw error; // or handle the error as needed
    }
}

module.exports= {getAllPayments}