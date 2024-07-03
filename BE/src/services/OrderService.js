const Order = require("../models/OrderProduct")
const Product = require("../models/ProductModel")
// const EmailService = require("../services/EmailService")

const createOrder = async (newOrder) => {
    const { orderitems, paymentmethod, itemprice, shippingprice, totalprice, user, fullname, address, phone, city } = newOrder;
    try {
        let itemprice = 0;
        for (let order of orderitems) {
            const product = await Product.findById(order.product);
            if (!product) {
                throw new Error(`Product with id ${order.product} not found`);
            }
            itemprice =itemprice+ product.price * order.amount-order.amount*product.discount;
        }
        const totalprice = itemprice + shippingprice;

        const promises = orderitems.map(async (order) => {
            const productData = await Product.findOneAndUpdate(
                {
                    _id: order.product,
                    countInStock: { $gte: order.amount }
                },
                {
                    $inc: {
                        countInStock: -order.amount,
                        selled: +order.amount
                    }
                },
                { new: true }
            );
            if (productData) {
                return {
                    status: 'OK',
                    message: 'SUCCESS'
                };
            } else {
                return {
                    status: 'OK',
                    message: 'ERR',
                    id: order.product
                }
            }
        })
        const results = await Promise.all(promises);
        const newData = results.filter(item => item.id);
        if (newData.length > 0) {
            const arrId = newData.map(item => item.id);
            throw new Error(`San pham voi id: ${arrId.join(',')} khong du hang`);
        }else{
            const createdOrder = await Order.create({
                orderitems,
                shippingaddress:{fullname,address,city,phone},
                paymentmethod,
                itemprice,
                shippingprice,
                totalprice,
                user,
                // isPaid,
                // paidAt
            })
            // if (createdOrder) {
            //     await EmailService.sendEmailCreateOrder(email,orderitems)
            //     resolve({
            //         status: 'OK',
            //         message: 'success'
            //     })
            // }
            return {
                status: 'OK',
                message: 'success',
                data: createdOrder
            }
        }

    } catch (e) {
        throw new Error(e.message);
    }
}
    

// const deleteManyProduct = (ids) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             await Product.deleteMany({ _id: ids })
//             resolve({
//                 status: 'OK',
//                 message: 'Delete product success',
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

const getAllOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
                user: id
            }).sort({createdAt: -1, updatedAt: -1})
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById({
                _id: id
            })
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}

const cancelOrder = async (id, data) => {
    try {
        let order = [];
        const promises = data.map(async (orderItem) => {
            const productData = await Product.findOneAndUpdate(
                {
                    _id: orderItem.product,
                    selled: { $gte: orderItem.amount }
                },
                {
                    $inc: {
                        countInStock: +orderItem.amount,
                        selled: -orderItem.amount
                    }
                },
                { new: true }
            );
            if (productData) {
                order = await Order.findByIdAndDelete(id);
                if (!order) {
                    return {
                        status: 'ERR',
                        message: 'The order is not defined'
                    };
                }
            } else {
                return {
                    status: 'OK',
                    message: 'ERR',
                    id: orderItem.product
                };
            }
        });
        const results = await Promise.all(promises);
        const newData = results.find(result => result && result.id);
        if (newData) {
            return {
                status: 'ERR',
                message: `San pham voi id: ${newData.id} khong ton tai`
            };
        }
        return {
            status: 'OK',
            message: 'delete successfully',
        };
    } catch (e) {
        throw e;
    }
};

// const cancelOrder = (id, data) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let order = []
//             const promises = data.map(async (order) => {
//                 const productData = await Product.findOneAndUpdate(
//                     {
//                     _id: order.product,
//                     selled: {$gte: order.amount}
//                     },
//                     {$inc: {
//                         countInStock: +order.amount,
//                         selled: -order.amount
//                     }},
//                     {new: true}
//                 )
//                 if(productData) {
//                     order = await Order.findByIdAndDelete(id)
//                     if (order === null) {
//                         resolve({
//                             status: 'ERR',
//                             message: 'The order is not defined'
//                         })
//                     }
//                 } else {
//                     return{
//                         status: 'OK',
//                         message: 'ERR',
//                         id: order.product
//                     }
//                 }
//             })
//             const results = await Promise.all(promises)
//             const newData = results && results[0] && results[0].id
//             if(newData) {
//                 resolve({
//                     status: 'ERR',
//                     message: `San pham voi id: ${newData} khong ton tai`
//                 })
//             }
//             resolve({
//                 status: 'OK',
//                 message: 'success',
//                 data: order
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

const getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.find().sort({createdAt: -1, updatedAt: -1})
            resolve({
                status: 'OK',
                message: 'Success',
                data: allOrder
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createOrder,
    getAllOrderDetails,
    getOrderDetails,
    cancelOrder,
    getAllOrder
}