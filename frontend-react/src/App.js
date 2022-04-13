import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useMoralis } from "react-moralis";

import "bulma/css/bulma.css";
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Mint from "./components/Mint";
import Gallery from "./components/gallery/Gallery";
import AccountChangedWarning from "./components/alerts/AccountChangedWarning";
import RinkebyWarning from "./components/alerts/RinkebyWarning";
import {
  PRODUCTION,
  CORRECT_CHAIN_ID,
  DERPIES_ADDRESS,
  VRFCOORDINATORMOCK_ADDRESS_LOCALHOST,
  CHAINLINK_WAIT_TIME_MS,
} from "./lib/constants";
import { range } from "./lib/range";
import delay from "./lib/delay";

import DerpiesLocalHost from "./contracts/localhost/Derpies.json";
import DerpiesRinkeby from "./contracts/rinkeby/Derpies.json";
import VRFCoordinatorMock from "./contracts/localhost/VRFCoordinatorMock.json";

let Derpies;
if (PRODUCTION) {
  Derpies = DerpiesRinkeby; // deployment
} else {
  Derpies = DerpiesLocalHost; // development
}

function App() {
  const { enableWeb3, isWeb3Enabled, chainId, account, Moralis } = useMoralis();

  const [selectedTab, setSelectedTab] = useState("About");

  // wallet loading state
  const [isMetamaskLoading, setIsMetamaskLoading] = useState(false);
  const [isWalletConnectLoading, setIsWalletConnectLoading] = useState(false);

  // minting state
  const [metamaskWaitingOnUser, setMetamaskWaitingOnUser] = useState(false);
  const [mintingInProgress, setMintingInProgress] = useState(false);
  const [awaitingBlockConfirmation, setAwaitingBlockConfirmation] = useState(false);
  const [transactionHash, setTransactionHash] = useState(null);
  const [isNewlyMinted, setIsNewlyMinted] = useState(false);
  const [mintedDerpieDetails, setMintedDerpieDetails] = useState(null);

  // gallery state
  const [showGallery, setShowGallery] = useState(false);
  const [gettingUserDerpies, setGettingUserDerpies] = useState(false);
  const [userDerpieDetails, setUserDerpieDetails] = useState([]);

  // warning and error state
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
  const [errorMessageConnect, setErrorMessageConnect] = useState(null);
  const [showAccountChangedWarning, setShowAccountChangedWarning] = useState(false);
  const [errorMessageMint, setErrorMessageMint] = useState(null);
  const [errorMessageGallery, setErrorMessageGallery] = useState(null);

  // Check for metamask on page load
  useEffect(() => {
    if (!window.ethereum) {
      console.log("no metamask detected");
      setIsMetamaskInstalled(true);
    }
  }, []);

  async function handleConnectMetaMask() {
    setIsMetamaskLoading(true);
    console.log("connecting to metamask");
    const web3Provider = await enableWeb3();
    console.log(web3Provider);
    setIsMetamaskLoading(false);
  }

  async function handleWalletConnect() {
    setIsWalletConnectLoading(true);

    console.log("connecting to Wallet Connect");
    const web3Provider = enableWeb3({
      provider: "walletconnect",
      mobileLinks: ["metamask"],
    });
    console.log(web3Provider);
    setIsWalletConnectLoading(false);
  }

  // listen for EIP-1193 events
  useEffect(() => {
    // Moralis.onWeb3Enabled((result) => {
    //   console.log(result);
    // });

    Moralis.onChainChanged((result) => {
      console.log(result);
      clearErrorMessages();
    });

    Moralis.onWeb3Deactivated((result) => {
      console.log(result);
      clearErrorMessages();
    });

    Moralis.onAccountChanged((result) => {
      console.log(result);
      setShowAccountChangedWarning(true);
      setTimeout(() => {
        setShowAccountChangedWarning(false);
      }, 3000);
    });

    // Moralis.onDisconnect((error) => {
    //   console.log(error);
    //   clearErrorMessages();
    // });
  });

  async function fetchMetadata(tokenUri) {
    try {
      const response = await fetch(tokenUri);

      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserDerpies() {
    // useMoralis() includes account and provider
    console.log("fetching derpies");

    const options = {
      contractAddress: DERPIES_ADDRESS,
      abi: Derpies.abi,
    };

    const numDerpies = await Moralis.executeFunction({
      ...options,
      functionName: "balanceOf",
      params: {
        owner: account,
      },
    });
    console.log(numDerpies.toString());

    console.log("done fetching derpies");

    let userDerpies = [];
    for (const derpie of range(0, parseInt(numDerpies.toString()))) {
      console.log(derpie);
      //get token id
      const tokenId = await Moralis.executeFunction({
        ...options,
        functionName: "tokenOfOwnerByIndex",
        params: { owner: account, index: derpie },
      });
      console.log(tokenId.toString());
      //get token uri
      const tokenUri = await Moralis.executeFunction({
        ...options,
        functionName: "tokenURI",
        params: { tokenId: parseInt(tokenId.toString()) },
      });
      console.log(tokenUri);
      const tokenUriHttps = `https://ipfs.io/ipfs/${tokenUri.split("").splice(7).join("")}`;
      const uriJSON = await fetchMetadata(tokenUriHttps);
      // push tokenId and uriJson to userDerpies
      userDerpies.push({ tokenId, uriJSON });
    }
    return userDerpies;
  }

  async function mintDerpie() {
    const options = {
      contractAddress: DERPIES_ADDRESS,
      abi: Derpies.abi,
    };
    console.log(options);

    const mintTx = await Moralis.executeFunction({
      ...options,
      functionName: "mintDerpie",
      msgValue: ethers.utils.parseEther("0.01"),
    });

    setAwaitingBlockConfirmation(true);

    setTransactionHash(mintTx.hash);

    setMetamaskWaitingOnUser(false);
    setMintingInProgress(true);

    const mintTxReceipt = await mintTx.wait();
    setAwaitingBlockConfirmation(false);

    console.log(mintTxReceipt);
    const requestId = mintTxReceipt.logs[3].topics[1];
    const tokenId = mintTxReceipt.events[3].topics[2];

    if (!PRODUCTION) {
      // VRFCOORDINATORMOCK for localhost tests only
      console.log("calling vrf coordinator mock");

      const vrfOptions = {
        contractAddress: VRFCOORDINATORMOCK_ADDRESS_LOCALHOST,
        abi: VRFCoordinatorMock.abi,
      };

      const randNumTx = await Moralis.executeFunction({
        ...vrfOptions,
        functionName: "callBackWithRandomness",
        params: { requestId: requestId, randomness: 22, consumerContract: DERPIES_ADDRESS },
      });
      await randNumTx.wait();
    }

    // display newly minted derpie
    let retrieved = false;
    while (retrieved === false) {
      console.log("checking in 30 seconds");
      await delay(CHAINLINK_WAIT_TIME_MS);
      try {
        const tokenUri = await Moralis.executeFunction({
          ...options,
          functionName: "tokenURI",
          params: { tokenId: parseInt(tokenId) },
        });
        console.log(tokenUri);
        const tokenUriHttps = `https://ipfs.io/ipfs/${tokenUri.split("").splice(7).join("")}`;
        const uriJSON = await fetchMetadata(tokenUriHttps);

        setMintedDerpieDetails({ tokenId: parseInt(tokenId.toString()), uriJSON });
        setIsNewlyMinted(true);
        retrieved = true;
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function getUserDerpiesHandler() {
    try {
      if (!isWeb3Enabled) return;
      clearErrorMessages();
      setGettingUserDerpies(true);

      const userDerpies = await getUserDerpies();
      setUserDerpieDetails(userDerpies);
      setShowGallery(true);
    } catch (error) {
      console.log(error);
      setErrorMessageGallery(error);
    }
    setGettingUserDerpies(false);
  }

  async function mintDerpieHandler() {
    try {
      if (!isWeb3Enabled) return;
      clearErrorMessages();
      setIsNewlyMinted(false);
      setMetamaskWaitingOnUser(true);

      await mintDerpie();
    } catch (error) {
      console.log(error);
      setErrorMessageMint(error);
    }
    setMetamaskWaitingOnUser(false);
    setMintingInProgress(false);
  }

  function clearErrorMessages() {
    setErrorMessageConnect(null);
    setErrorMessageMint(null);
    setErrorMessageGallery(null);
  }

  useEffect(() => {
    clearErrorMessages();
  }, [selectedTab]);

  return (
    <>
      <Navbar setSelectedTab={setSelectedTab} />

      {isWeb3Enabled && chainId !== CORRECT_CHAIN_ID && <RinkebyWarning />}
      {showAccountChangedWarning && <AccountChangedWarning />}

      {selectedTab === "About" && <About setSelectedTab={setSelectedTab} />}
      {selectedTab === "Mint" && (
        <Mint
          isMetamaskInstalled={isMetamaskInstalled}
          errorMessageConnect={errorMessageConnect}
          setErrorMessageConnect={setErrorMessageConnect}
          mintDerpieHandler={mintDerpieHandler}
          errorMessageMint={errorMessageMint}
          setErrorMessageMint={setErrorMessageMint}
          metamaskWaitingOnUser={metamaskWaitingOnUser}
          mintingInProgress={mintingInProgress}
          awaitingBlockConfirmation={awaitingBlockConfirmation}
          setSelectedTab={setSelectedTab}
          transactionHash={transactionHash}
          isNewlyMinted={isNewlyMinted}
          mintedDerpieDetails={mintedDerpieDetails}
          handleConnectMetaMask={handleConnectMetaMask}
          handleWalletConnect={handleWalletConnect}
        />
      )}
      {selectedTab === "Gallery" && (
        <Gallery
          isMetamaskInstalled={isMetamaskInstalled}
          isMetamaskLoading={isMetamaskLoading}
          isWalletConnectLoading={isWalletConnectLoading}
          errorMessageConnect={errorMessageConnect}
          setErrorMessageConnect={setErrorMessageConnect}
          getUserDerpiesHandler={getUserDerpiesHandler}
          gettingUserDerpies={gettingUserDerpies}
          userDerpieDetails={userDerpieDetails}
          errorMessageGallery={errorMessageGallery}
          setErrorMessageGallery={setErrorMessageMint}
          showGallery={showGallery}
          setShowGallery={setShowGallery}
          handleConnectMetaMask={handleConnectMetaMask}
          handleWalletConnect={handleWalletConnect}
        />
      )}
    </>
  );
}

export default App;
