const express = require('express');
const cors = require('cors');
const app = express();
const getBitcoinPriceController = require('./controller');

app.use(cors());

app.get('/get-btc-price', async (req, res)=> {
    return await getBitcoinPriceController(req, res)
})

app.listen(5000, ()=> {
    console.log("Server is listening at port 5000")
});