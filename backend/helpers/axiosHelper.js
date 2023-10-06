const axios = require('axios');

let getRequest = async()=> {
    try {
        let response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&precision=2");
        if (response.status === 200) {
            return response.data;
        } else {
            return 0;
        }
    } catch(error) {
        console.log('error ', error);
        return 0;
    }
}

module.exports = getRequest;