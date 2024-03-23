

const orderService = require('../services/orderService');
const axios = require('axios');

const addNewOrder = async (req, res) => {
    try {
        const {body} = req;
        const {user_id} = req.auth;

        const {order, transactions} = body;


        //add user id along with the user data
        order.user_id = user_id;


        // Extracting the payment reference from the transactions request.
        const myPayRef = transactions.reference;

        // Verify Transaction from paystack service
        const paymentResp = await axios.get(`https://api.paystack.co/transaction/verify/${myPayRef}`, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            },
        });

        //confirm payment status
        if (paymentResp.data.data.status === "success") {
            transactions.status = "paid";
        } else {
            transactions.status = "unpaid";
        }

        const newOrder = await orderService.addOrder(order, transactions);
        res.status(201).json({
            message: "Order added successfully",
            order: newOrder,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


module.exports = {
    addNewOrder,
};