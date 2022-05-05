import { useMoralis } from "react-moralis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import DerpieCard from "./derpieCard/DerpieCard";
import MintProgressNotification from "./alerts/MintProgressNotification";
import ErrorMessage from "./alerts/ErrorMessage";
import MetaMaskOpen from "./alerts/WalletOpenMessage";
import ConnectButton from "./ConnectButton";

import FoxMetamask from "../img/FoxFace.png";
import walletConnectImg from "../img/wallet-connect.png";

import { CORRECT_CHAIN_ID } from "../lib/constants";

const Mint = (props) => {
  const {
    isMetamaskInstalled,
    errorMessageConnect,
    setErrorMessageConnect,
    mintDerpieHandler,
    metamaskWaitingOnUser,
    mintingInProgress,
    awaitingBlockConfirmation,
    setSelectedTab,
    transactionHash,
    isNewlyMinted,
    mintedDerpieDetails,
    errorMessageMint,
    setErrorMessageMint,
    handleConnectMetaMask,
    handleWalletConnect,
  } = props;

  const { isWeb3Enabled, isWeb3EnableLoading, chainId } = useMoralis();

  return (
    <div className="background">
      <section className="section has-text-centered">
        <h1 className="shizuru pb-5">MINT</h1>
        <h2 className="subtitle custom-mobile-subtitle">
          Mint a Derpie here! Each Derpie costs 0.01 <strong>test</strong> ETH + gas on <strong>Rinkeby</strong>.
        </h2>
        <p className="custom-smaller-mobile-text">
          Make sure your wallet is connected to the Rinkeby Ethereum Testnet (network id: 4) and is funded with Rinkeby
          test ether.
        </p>
        <p className="custom-smaller-mobile-text pt-1">
          You can get test ether from a faucet. Try this one:{" "}
          <a href="https://faucets.chain.link/rinkeby" target="_blank" rel="noreferrer">
            https://faucets.chain.link/rinkeby
          </a>
        </p>

        {!isWeb3Enabled && (
          <div className="custom-wallet-btns-div">
            <ConnectButton
              isWeb3EnableLoading={isWeb3EnableLoading}
              connectWalletHandler={handleConnectMetaMask}
              logo={FoxMetamask}
              text={"Connect With MetaMask"}
              isDisabled={isMetamaskInstalled}
            />

            {/* <ConnectButton
              isWeb3EnableLoading={isWeb3EnableLoading}
              connectWalletHandler={handleWalletConnect}
              logo={walletConnectImg}
              text={"Wallet Connect"}
            /> */}
          </div>
        )}

        {errorMessageConnect && (
          <ErrorMessage errorMessage={errorMessageConnect} setErrorMessage={setErrorMessageConnect} />
        )}

        {isWeb3Enabled && (
          <button
            className={`button mt-4 mb-4 ${metamaskWaitingOnUser ? "is-loading" : ""}`}
            disabled={mintingInProgress || chainId !== CORRECT_CHAIN_ID}
            onClick={mintDerpieHandler}
          >
            Mint a Whoopsie Derpie
          </button>
        )}

        {metamaskWaitingOnUser && <MetaMaskOpen />}
        {mintingInProgress && (
          <MintProgressNotification
            awaitingBlockConfirmation={awaitingBlockConfirmation}
            setSelectedTab={setSelectedTab}
            transactionHash={transactionHash}
          />
        )}

        {errorMessageMint !== null && (
          <ErrorMessage errorMessage={errorMessageMint} setErrorMessage={setErrorMessageMint} />
        )}
        <div className="is-flex is-flex-direction-column is-justify-content-center is-align-items-center mt-4">
          {isWeb3Enabled && isNewlyMinted && (
            <>
              <p className="is-size-4 is-size-5-mobile is-uppercase">
                <FontAwesomeIcon className="fas fa-2x fa-solid is-size-3 is-size-4-mobile " icon={faStar} /> a new
                derpie is born!{" "}
                <FontAwesomeIcon className="fas fa-2x fa-solid is-size-3 is-size-4-mobile" icon={faStar} />
              </p>
              <div className="is-flex is-flex-direction-column is-justify-content-center is-align-items-center mt-4">
                <DerpieCard derpieDetails={mintedDerpieDetails} />
              </div>
              {/* <p className="is-size-7 pt-3">Transaction Hash:</p>
              <p className="is-size-7 custom-word-wrap">{transactionHash}</p> */}
              <p className="is-size-7 pt-3">
                View transaction on etherscan{" "}
                <a href={`https://rinkeby.etherscan.io/tx/${transactionHash}`} target="_blank" rel="noreferrer">
                  here
                </a>
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Mint;
