import logo from './logo.svg';
import './App.css';
import InputData from './InputData';
import "react-datepicker/dist/react-datepicker.css";
import {ethers} from 'ethers';
import {useState, useEffect} from 'react';
import Button from '@mui/material/Button';

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [loggedInToMetaMask, setLoggedInToMetaMask] = useState(false);
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      console.log(ethereum.selectedAddress);

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      if(ethereum.selectedAddress === null){
        alert('Log into meta mask');
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log(accounts[0]);

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {currentAccount ? (<h1>Connected as {currentAccount}</h1>) : <h1>Please connect wallet to begin</h1> }
        {!currentAccount && (
          <Button onClick={connectWallet} variant='contained'>
            Connect
          </Button>
        )}
        </header>
        {currentAccount && (<InputData />)}


      
    </div>
  );
}

export default App;
