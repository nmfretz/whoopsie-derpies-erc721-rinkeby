import { useMoralis } from "react-moralis";

import { useState } from "react";
import Logo from "../img/Logo.png";

const Navbar = ({ setSelectedTab }) => {
  const [isActive, setIsActive] = useState(false);
  const { isWeb3Enabled, chainId, account, Moralis } = useMoralis();

  const tempAccount = account;
  let truncatedAccount = "";
  if (tempAccount !== null) {
    truncatedAccount = `${tempAccount.slice(0, 4)}...${tempAccount.slice(-4)}`;
  }

  function logoClickHandler() {
    setSelectedTab("About");
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE, Opera
  }

  async function handleDisconnect() {
    Moralis.deactivateWeb3();
  }

  return (
    <>
      <nav className="navbar custom-navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand is-flex is-align-items-center">
          <figure className="image is-64x64 custom-nav-img pl-3 is-flex is-align-items-center">
            <img className="" src={Logo} />
          </figure>
          <a className="navbar-item shizuru is-size-3 is-size-4-mobile" onClick={logoClickHandler}>
            <span className="">WhoopsieDerpies</span>
          </a>

          <button
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target=""
            onClick={() => setIsActive(!isActive)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div id="" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
          <div className="navbar-end">
            <a
              className="navbar-item"
              onClick={() => {
                setSelectedTab("About");
                setIsActive(false);
              }}
            >
              About
            </a>
            <a
              className="navbar-item"
              onClick={() => {
                setSelectedTab("Mint");
                setIsActive(false);
              }}
            >
              Mint
            </a>
            <a
              className="navbar-item"
              onClick={() => {
                setSelectedTab("Gallery");
                setIsActive(false);
              }}
            >
              Your Derpies
            </a>
          </div>
          <div className="navbar-item">
            <div className="custom-connect-status">
              <span className="custom-connect-status__network">Network ID: {parseInt(chainId) || ""}</span>
              <span className="custom-connect-status__account">Account: {truncatedAccount}</span>
            </div>
          </div>
          {isWeb3Enabled && (
            <div className="navbar-item">
              <button className="button" onClick={() => handleDisconnect()}>
                Disconnect
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
