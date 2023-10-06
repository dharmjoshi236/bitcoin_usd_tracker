import React, {useEffect, useState} from "react";

const Home = ()=> {
    
    const [btcPrice, setBtcPrice] = useState();
    const [connection, setConnection] = useState();
    
    const getRealtimePrice = (data)=> {
        setBtcPrice(data);
    }

    useEffect(()=> {
        const sseData = new EventSource("http://localhost:5000/get-btc-price",  {withCredentials: false});
        sseData.onopen = e => setConnection("Active!")
        sseData.onmessage = e => getRealtimePrice(e.data);
        sseData.onerror = e => {
            setConnection("InActive !")
            sseData.close();
        }
        return () => {
            sseData.close();
        };
    }, [])
    

    return (
        <>
        <h3>Welcome to the Bitcoin Tracker</h3>
        <p>This bitcoin tracker is using CoinGecko Api to fetch the price.</p>
        <p>Connection Status: {connection}</p>
        <h5>Bitcoin price: ${btcPrice}</h5>

        </>
    )
}

export default Home;