const PaymentRouter=require('./PaymentRouter')
const OrderRouter=require('./OrderRouter')
const ProductRouter=require('./ProductRouter')
const UserRouter=require('./UserRouter')

const routes=(app)=>{
    app.use('/',PaymentRouter),
    app.use('/',OrderRouter),
    app.use('/',ProductRouter),
    app.use('/',UserRouter)
}
module.exports=routes


