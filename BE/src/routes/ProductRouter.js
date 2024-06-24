const express = require("express");
const router = express.Router()
const ProductController = require('../controllers/ProductController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', ProductController.createProduct)
router.put('/update/:id', authMiddleWare, ProductController.updateProduct)
router.get('/getdetails/:id', ProductController.getDetailsProduct)
router.delete('/delete/:id', ProductController.deleteProduct)//,authMiddleWare
router.get('/getall', ProductController.getAllProduct)
router.post('/deletemany', authMiddleWare, ProductController.deleteMany)
router.get('/getalltype', ProductController.getAllType)

module.exports = router