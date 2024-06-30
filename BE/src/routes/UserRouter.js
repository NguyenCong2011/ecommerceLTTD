const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController');
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware");

router.post('/createUser', userController.createUser)
router.post('/loginUser', userController.loginUser)
router.post('/logout', userController.logoutUser)
router.put('/updateuser/:id', authUserMiddleWare, userController.updateUser)//authUserMiddleWare
router.delete('/deleteuser/:id', authMiddleWare, userController.deleteUser)
router.get('/getAll', authMiddleWare, userController.getAllUser)
router.get('/getUserdetails/:id',authUserMiddleWare, userController.getDetailsUser)//authUserMiddleWare
router.get('/refreshtoken', userController.refreshToken)//tạo access token khi access token hết hạn
router.delete('/deletemanyUser', authMiddleWare, userController.deleteMany)

module.exports = router