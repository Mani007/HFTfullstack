import React,{useState,useRef,useEffect} from 'react';
import Dropdown from './components/Dropdown.tsx';
import Tokeninput from './components/Tokeninput.tsx';
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
//import logo from './logo.svg';
//import './App.css';

function App() {
  const [chain,setChain] = useState('')
  const [pairs, setPairs] = useState([]);
  const [selectedPair, setSelectedPair] = useState("");
  const [candlestickData, setCandlestickData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const intervalRef = useRef();
  

  const resetState = () => {
    setPairs([]);
    setSelectedPair("");
    setCandlestickData([]);
    setError(null);
    setLoading(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
  const handleChainSelect = (selectedChain) => {
    resetState();
    setChain(selectedChain);
  };

  const fetchCandlestickData = async (pairAddress) => {
    if (!pairAddress) return;

    if (initialLoading) {
      setLoading(true);
    }
  //console.log(chain)
  try {
    const apiKey = process.env.REACT_APP_API_KEY;
    // console.log(apiKey)
    const currentTime = Math.floor(Date.now() / 1000);
    const fromDate = currentTime - 6 * 30 * 24 * 60 * 60;
    const toDate = currentTime;

    const url =
      chain === "sol"
        ? `https://solana-gateway.moralis.io/token/mainnet/pairs/${pairAddress}/ohlcv`
        : `https://deep-index.moralis.io/api/v2.2/pairs/${pairAddress}/ohlcv`;

    const params =
      chain === "sol"
        ? { timeframe: "1d", currency: "usd", fromDate, toDate, limit: 1000 }
        : {
            chain,
            timeframe: "1d",
            currency: "usd",
            fromDate,
            toDate,
            limit: 1000,
          };

    const response = await axios.get(url, {
      params,
      headers: { "X-API-Key": apiKey, accept: "application/json" },
    });

    const sortedData = response.data.result
      .map((item) => ({
        time: Math.floor(new Date(item.timestamp).getTime() / 1000),
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
      }))
      .sort((a, b) => a.time - b.time);

    setCandlestickData(sortedData);
  } catch (error) {
    setError("Failed to fetch candlestick data. Please try again.");
  } finally {
    setLoading(false);
    setInitialLoading(false);
  }
};

useEffect(() => {
  if (pairs.length > 0 && !selectedPair) {
    setSelectedPair(pairs[0].pair_address || pairs[0].pairAddress);
  }
}, [pairs]);

useEffect(() => {
  if (selectedPair) {
    fetchCandlestickData(selectedPair);
    intervalRef.current = setInterval(
      () => fetchCandlestickData(selectedPair),
      10000
    );
    return () => clearInterval(intervalRef.current);
  }
}, [selectedPair]);
  return (
    <div className="bg-slate-700 w-screen h-screen">
      <header className="">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        
      </header>
      <div className='flex-col sm:flex items-center justify-normal '>
        <Dropdown onSelect={setChain}/>
        <label className="text-white">Enter Token Address</label>
          <Tokeninput
            chain={chain}
            onPairsFetched={setPairs}
            onReset={resetState}
          />
      </div>

    </div>
  );
}

export default App;
