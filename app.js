const express = require('express');
const app = express();
const rateLimit = require('express-rate-limit');
const productRoutes = require('./routes/productRoutes');
const saleRoutes = require('./routes/salesRoutes');
const inventorRoutes = require('./routes/inventoryRoutes');

app.use(express.json());


const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/sales', saleRoutes);
app.use('/api/v1/inventory', inventorRoutes);


app.listen(3000, () => console.log('Server running on port 3000'));
