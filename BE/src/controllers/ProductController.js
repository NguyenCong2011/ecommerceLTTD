const ProductService = require('../services/Productservice')

const createProduct = async (req, res) => {
    try {
        const { name, type, countInStock, price, rating, description,discount,selled } = req.body
        const image=req.file
        if (!image || !image.path) {
            return res.status(400).json({
                status: 'ERR',
                message: 'No file uploaded or invalid file'
            });
        }
        if (!name ||!type || !countInStock || !price || !rating||!discount) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is requiredggggggggggg'
            })
        }
        const imagePath = image.path;
        const newProduct = {
            name,
            image: imagePath,
            type,
            countInStock: Number(countInStock),
            price,
            selled,
            rating,
            description,
            discount: Number(discount)
        };
        const result = await ProductService.createProduct(newProduct)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await ProductService.updateProduct(productId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await ProductService.getDetailsProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await ProductService.deleteProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            })
        }
        const response = await ProductService.deleteManyProduct(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const result = await ProductService.getAllProduct(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(result)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllType = async (req, res) => {
    try {
        const response = await ProductService.getAllType()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteMany,
    getAllType
}