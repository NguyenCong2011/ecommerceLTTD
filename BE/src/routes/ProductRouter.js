const express = require("express");
const router = express.Router()
const ProductController = require('../controllers/ProductController');
const { authMiddleWare } = require("../middleware/authMiddleware");
const upload=require('../upload/uploadd')

router.post('/create', upload.single('image'), ProductController.createProduct)
router.put('/update/:id', authMiddleWare, ProductController.updateProduct)
router.get('/getdetails/:id', ProductController.getDetailsProduct)
router.delete('/delete/:id', ProductController.deleteProduct)//,authMiddleWare
router.get('/getall', ProductController.getAllProduct)
router.delete('/deletemanyProduct',authMiddleWare, ProductController.deleteMany)//authMiddleWare
router.get('/getalltype', ProductController.getAllType)

module.exports = router