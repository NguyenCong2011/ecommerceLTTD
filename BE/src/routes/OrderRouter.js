const express = require("express");
const router = express.Router()
const OrderController = require('../controllers/OrderController');
// const { authUserMiddleWare, authMiddleWare } = require("../middleware/authMiddleware");

router.post('/createOrder', OrderController.createOrder)//authUserMiddleWare
router.get('/get-all-order/:id', OrderController.getAllOrderDetails)//authUserMiddleWare
router.get('/get-details-order/:id', OrderController.getOrderDetails)//authUserMiddleWare
router.delete('/cancel-order/:id', OrderController.cancelOrderDetails)//authUserMiddleWare
router.get('/get-all-order', OrderController.getAllOrder)//authMiddleWare


module.exports = router