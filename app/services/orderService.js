const Order = require('../models/orderModels');
const Transaction = require('../models/transactionModels');



//  add new task service
const addOrder = async (orderData,transaction) => {
    try {        
        const transactionData = new Transaction (transaction);
    const newTrans = await transactionData.save();

        orderData.transaction_id = newTrans._id;
        const newOrder = new Order(orderData);
        await newOrder.save();
        console.log(orderData);


        // return newOrder;
    } catch (error) {
        throw new Error ("Error adding new order")
    }
};

module.exports = { addOrder }