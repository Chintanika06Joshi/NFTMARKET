import { useState } from "react";
import "./App.css";
import axios from "axios";
import { ethers } from "ethers";

import { createAppKit } from "@reown/appkit/react";
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";
import { polygonAmoy } from "@reown/appkit/networks";

// 1. Get projectId
const projectId = "YOUR_PROJECT_ID";

// 3. Create the AppKit instance
createAppKit({
  adapters: [new Ethers5Adapter()],
  metadata: metadata,
  networks: [polygonAmoy],
  projectId,
  features: {
    analytics: true,
  },
});

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [nftName, setNftName] = useState("");
  const [nftMetadata, setNftMetadata] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        const Provider= new ethers.providers.Web3Provider(window.ethereum);
        const signer= Provider.getSigner;
        
      } catch (err) {
        console.error("User rejected connection or other error:", err);
      }
    } else {
      alert("MetaMask is not installed, please install it.");
    }
  };

  const DisconnectWallet=()=>
  {
    setWalletAddress(null);
  };

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      {!walletAddress ? (
        <button onClick={connectWallet} style={styles.button}>
          Connect Wallet
        </button>
      ) : (
        <>
          <h2>Hello from Chintanika 👋</h2>
          <p>
            <strong style={{ color: "green" }}>Wallet Connected ✅</strong>
            
            <br />
            <span>Your address:</span>
            <br />
        
            <strong>{walletAddress}</strong>
            
          </p>
          <br/>
           <button onClick={DisconnectWallet}>Disconect</button>
        </>
      )}
    </div>
  );
}

const styles = {
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;
