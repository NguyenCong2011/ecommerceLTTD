const OrderService = require('../services/OrderService')

const createOrder = async (req, res) => {
    try { 
        const {orderitems, paymentmethod, itemprice, shippingprice, totalprice ,user,fullname,address,phone,city} = req.body
        if (!orderitems||!paymentmethod || !itemprice || !shippingprice || !totalprice ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const result = await OrderService.createOrder(req.body)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            status:"okkkkkk",
            message: error
        })
    }
}

const getAllOrderDetails = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await OrderService.getAllOrderDetails(userId)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const getOrderDetails = async (req, res) => {
    try {
        const orderId = req.params.id
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await OrderService.getOrderDetails(orderId)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const cancelOrderDetails = async (req, res) => {
    try {
        const data= req.body.orderItems
        const orderId= req.body.orderId
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The orderId is required'
            })
        }
        const response = await OrderService.cancelOrderDetails(orderId, data)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const getAllOrder = async (req, res) => {
    try {
        const data = await OrderService.getAllOrder()
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createOrder,
    getAllOrderDetails,
    getOrderDetails,
    cancelOrderDetails,
    getAllOrder
}
