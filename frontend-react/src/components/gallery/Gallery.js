import { useMoralis } from "react-moralis";

import UserDerpies from "./UserDerpies";
import ConnectButton from "../ConnectButton";
import NoDerpiesNotification from "../alerts/NoDerpiesNotification";
import ErrorMessage from "../alerts/ErrorMessage";

import FoxMetamask from "../../img/FoxFace.png";
import walletConnectImg from "../../img/wallet-connect.png";

import { CORRECT_CHAIN_ID } from "../../lib/constants";

const Gallery = (props) => {
  const {
    isMetamaskInstalled,
    isMetamaskLoading,
    isWalletConnectLoading,
    errorMessageConnect,
    setErrorMessageConnect,
    gettingUserDerpies,
    getUserDerpiesHandler,
    userDerpieDetails,
    showGallery,
    setShowGallery,
    errorMessageGallery,
    setErrorMessageGallery,
    handleConnectMetaMask,
    handleWalletConnect,
  } = props;

  const { isWeb3Enabled, isWeb3EnableLoading, chainId } = useMoralis();

  return (
    <div className="background">
      <section className="section has-text-centered">
        <h1 className="shizuru pb-5">YOUR DERPIES GALLERY</h1>
        <h2 className="subtitle custom-mobile-subtitle">All your derpies in one place!</h2>

        {!isWeb3Enabled && (
          <div className="custom-wallet-btns-div">
            <ConnectButton
              isWeb3EnableLoading={isWeb3EnableLoading}
              isLoading={isMetamaskLoading}
              connectWalletHandler={handleConnectMetaMask}
              logo={FoxMetamask}
              text={"Connect With MetaMask"}
              isDisabled={isMetamaskInstalled}
            />

            {/* <ConnectButton
              isWeb3EnableLoading={isWeb3EnableLoading}
              isLoading={isWalletConnectLoading}
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
            className={`button mb-4 ${gettingUserDerpies ? "is-loading" : ""}`}
            onClick={getUserDerpiesHandler}
            disabled={chainId !== CORRECT_CHAIN_ID}
          >
            {userDerpieDetails.length === 0 ? "See Your Derpies" : "Refresh Your Derpies"}
          </button>
        )}
        {isWeb3Enabled && showGallery && <UserDerpies userDerpieDetails={userDerpieDetails} />}
        {showGallery && userDerpieDetails.length === 0 && <NoDerpiesNotification setShowGallery={setShowGallery} />}
        {errorMessageGallery !== null && (
          <ErrorMessage errorMessage={errorMessageGallery} setErrorMessage={setErrorMessageGallery} />
        )}
      </section>
    </div>
  );
};

export default Gallery;
