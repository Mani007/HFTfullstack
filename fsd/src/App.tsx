import React,{useState} from 'react';
import Dropdown from './components/Dropdown.tsx';
//import logo from './logo.svg';
//import './App.css';

function App() {
  const [chain,setChain] = useState('')
  console.log(chain)
  return (
    <div className="bg-slate-700 w-screen h-screen">
      <header className="">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        
      </header>
      <div className='flex-col sm:flex items-center justify-normal '>
        <Dropdown onSelect={setChain}/>


      </div>
    </div>
  );
}

export default App;
