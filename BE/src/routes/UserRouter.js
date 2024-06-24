const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController');
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', userController.createUser)
router.post('/loginUser', userController.loginUser)
router.post('/logout', userController.logoutUser)
router.put('/updateuser/:id', authUserMiddleWare, userController.updateUser)
router.delete('/deleteuser/:id', authMiddleWare, userController.deleteUser)
router.get('/getAll', authMiddleWare, userController.getAllUser)
router.get('/getdetails/:id', authUserMiddleWare, userController.getDetailsUser)
router.get('/refreshtoken',authMiddleWare, userController.refreshToken)
router.post('/deletemany', authMiddleWare, userController.deleteMany)

module.exports = router