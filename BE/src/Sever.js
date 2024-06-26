const express=require('express')
const dotenv=require('dotenv')
const  mongoose  = require('mongoose')
const bodyParser=require('body-parser')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const routes=require('./routes/routetong')
const app=express()
const port=process.env.PORT||3001

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
dotenv.config()
routes(app)

mongoose.connect("mongodb://root:root@localhost:27019/")
        .then(()=>{
            console.log("db connect success");
            app.listen(port,()=>{
                console.log('sever runing on port:',+port);
            })
        })
        .catch((err)=>{
            throw err
        });

        