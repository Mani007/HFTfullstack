import React, { useState } from "react";
import axios from "axios";

function Tokeninput({ chain, onPairsFetched, onReset }) {
    const [tokenAddress, setTokenAddress] = useState("");
    const [loading, setLoading] = useState(false);
  
    const handleTokenChange = (e) => {
      setTokenAddress(e.target.value);
      onReset();
    };
  
    const fetchPairs = async () => {
      const apiKey = process.env.REACT_APP_API_KEY;
      console.log(apiKey)
      const url =
        chain === "sol"
          ? `https://solana-gateway.moralis.io/token/mainnet/${tokenAddress}/pairs`
          : `https://deep-index.moralis.io/api/v2.2/erc20/${tokenAddress}/pairs?chain=${chain}`;
  
      setLoading(true);
      console.log(`Fetching pairs for token: ${tokenAddress} on chain: ${chain}`);
  
      try {
        const response = await axios.get(url, {
          headers: { "X-API-Key": apiKey, accept: "application/json" },
        });
  
        console.log("Fetched pairs:", response.data.pairs);
  
        const sortedPairs = response.data.pairs
          .map((pair) => ({
            ...pair,
            liquidity: pair.liquidity_usd || pair.liquidityUsd || 0,
          }))
          .sort((a, b) => b.liquidity - a.liquidity);
  
        onPairsFetched(sortedPairs);
      } catch (error) {
        console.error("Error fetching token pairs:", error);
        onPairsFetched([]);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className='flex-col sm:flex'>
        <input 
        className='text-white'
          style={{ marginBottom: "5%" }}
          type="text"
          placeholder="Enter Token Address"
          value={tokenAddress}
          onChange={handleTokenChange}
        />
        <button className='text-white bg-blue-400 hover:bg-green-600 rounded-full' onClick={fetchPairs} disabled={!tokenAddress || !chain}>
          Fetch Pairs
        </button>
        {loading && <div>Loading pairs...</div>}
      </div>
    );
}

export default Tokeninput