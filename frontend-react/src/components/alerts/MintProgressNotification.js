const MintProgressNotification = ({ awaitingBlockConfirmation, setSelectedTab, transactionHash }) => {
  function galleryClickHandler() {
    setSelectedTab("Gallery");
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE, Opera
  }

  return (
    <div className="notification is-primary is-light container mt-5">
      {/* <button className="button is-loading custom-mint-wait-btn"></button> */}
      <p className="mb-3">Your Derpie will show here soon!</p>
      <p className="mb-3">
        It may take up to 5 minutes for your random Derpie to be processed by the ethereum rinkeby network. You can view
        your pending transaction on etherscan here:{" "}
        <a
          className="custom-word-wrap"
          href={`https://rinkeby.etherscan.io/tx/${transactionHash}`}
          target="_blank"
          rel="noreferrer"
        >
          https://rinkeby.etherscan.io/tx/{transactionHash}
        </a>
      </p>

      {awaitingBlockConfirmation ? (
        <div className="is-flex is-justify-content-center is-align-items-center">
          <p className="">Awaiting transaction confirmation</p>
          <button className="button is-loading custom-mint-wait-btn"></button>
        </div>
      ) : (
        <div className="is-flex is-justify-content-center is-align-items-center">
          <p className="">
            Transaction confirmed! Now waiting on{" "}
            <a className="" href="https://docs.chain.link/docs/chainlink-vrf/" target="_blank" rel="noreferrer">
              ChainLink VRF
            </a>{" "}
            to generate a random number for your Derpie
          </p>
          <button className="button is-loading custom-mint-wait-btn"></button>
        </div>
      )}

      {/* 
      <p>
        Refreshing the page will prevent you from seeing your newly minted Derpie here, but you will be able to view it
        in the <a onClick={galleryClickHandler}>Gallery</a> once it has been processed.
      </p> */}
    </div>
  );
};

export default MintProgressNotification;
