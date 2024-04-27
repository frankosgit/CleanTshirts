const express = require('express')
const OrderController = require('../controllers/orderControllers');

const router = express.Router()

const orderController = new OrderController();

router.get("/", orderController.getOrders)
router.post("/create", orderController.createOrder)


module.exports = router