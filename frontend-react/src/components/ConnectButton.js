const ConnectButton = ({ connectWalletHandler, logo, text, isWeb3EnableLoading, isDisabled, isLoading }) => {
  return (
    <>
      <button
        className={`button custom-connect-btn p-6 ${isWeb3EnableLoading && isLoading ? "is-loading" : ""}`}
        onClick={connectWalletHandler}
        disabled={isDisabled}
      >
        <figure className="image is-96x96 mr-2 custom-mobile-metamask-fox">
          <img src={logo} alt="" />
        </figure>
        <span className="is-uppercase is-size-7-mobile">{isDisabled ? "metamask not installed" : text}</span>
      </button>
    </>
  );
};

export default ConnectButton;
