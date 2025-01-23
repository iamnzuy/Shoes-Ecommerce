import express from 'express'
import cors from 'cors'
import { config } from 'dotenv';
config()
import errorHandling from './middleware/errorHandling.js';
import authRouter from './routes/auth.js'
import productRouter from './routes/product.js'
import orderRouter from './routes/order.js'
import startServer from './db.js';
import cookieParser from 'cookie-parser';
import { mongo } from 'mongoose';
import { productModel } from './models/product.js';

const app = express();

app.use(cors({
  origin: 'https://eccomerce-deploy.vercel.app',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
startServer()
app.use('/auth',authRouter)
app.use('/products',productRouter)
app.use('/order',orderRouter)

app.get('/getProducts', (req,res) => {
  productModel.find()
  .then(users => res.json(users))
  .catch(err => res.json(err));
})

//handle unexisted route
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
app.use(errorHandling)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
