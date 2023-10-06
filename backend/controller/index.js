const getBitcoinPriceHelper = require('../helpers/axiosHelper');

const getBitcoinPriceController = async (req,res) => {
    try {
        res.writeHead(200, {
            "Connection": "keep-alive",
            "Cache-Control": "no-cache",
            "Content-Type": "text/event-stream",
          });
        res.write('event: connected\n');
        res.write('data: Connection Established\n\n');

        res.write('event: message\n');
            let updatedData = await getBitcoinPriceHelper();

            if (updatedData === 0) {
                res.end('data: Unable to get the price of bitcoin\n\n');
                return;
            }
            
            res.write(`data: ${updatedData.bitcoin.usd}\n`);
            res.write(`id: ${Date.now()}\n\n`);

        // Send a updated price every ten seconds
        let interval = setInterval(async () => {
            res.write('event: message\n');
            let updatedData = await getBitcoinPriceHelper();

            if (updatedData === 0) {
                res.end('data: Unable to get the price of bitcoin\n\n');
                return;
            }

            res.write(`data: ${updatedData.bitcoin.usd}\n`);
            res.write(`id: ${Date.now()}\n\n`);
        }, 10000);

        req.on('close', () => {
            clearInterval(interval); 
            res.end('data: Connection Closed\n\n')
        });
    } catch(error) {
        console.log('error', error);
        res.status(400).json({
            message: "Unable to get the updated bitcoin price",
            status: 0
        })
    }
}

module.exports = getBitcoinPriceController;
