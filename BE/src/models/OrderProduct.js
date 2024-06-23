const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    orderitems: [
        {
            name: { type: String, required: true },
            amount: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            }
        }
    ],
    shippingaddress: {
        fullname: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        phone: { type: Number, required: true }
    },
    paymentmethod: { type: String, required: true },
    itemprice: { type: Number, required: true },
    shippingprice: { type: Number, required: true },
    totalprice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ispaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isdelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
