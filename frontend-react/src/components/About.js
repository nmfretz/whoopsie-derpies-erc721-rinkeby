import Beaver from "../img/derpie_img/Beaver.png";
import Bunny from "../img/derpie_img/Bunny.png";
import Cat from "../img/derpie_img/Cat.png";
import Cheetah from "../img/derpie_img/Cheetah.png";
import Elephant from "../img/derpie_img/Elephant.png";
import Flamingo from "../img/derpie_img/Flamingo.png";
import Fox from "../img/derpie_img/Fox.png";
import Giraffe from "../img/derpie_img/Giraffe.png";
import Hedgie from "../img/derpie_img/Hedgie.png";
import Horse from "../img/derpie_img/Horse.png";
import Lemur from "../img/derpie_img/Lemur.png";
import Llama from "../img/derpie_img/Llama.png";
import Narwhal from "../img/derpie_img/Narwhal.png";
import Octopus from "../img/derpie_img/Octopus.png";
import Orca from "../img/derpie_img/Orca.png";
import Pig from "../img/derpie_img/Pig.png";
import Rhino from "../img/derpie_img/Rhino.png";
import Sandpiper from "../img/derpie_img/Sandpiper.png";
import Shark from "../img/derpie_img/Shark.png";
import Squirrel from "../img/derpie_img/Squirrel.png";

const About = ({ setSelectedTab }) => {
  function mintPageHandler() {
    setSelectedTab("Mint");
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE, Opera
  }

  return (
    <div className="background">
      <section className="section has-text-centered pb-0 container">
        <h1 className="shizuru pb-6">ABOUT</h1>
        <h2 className="subtitle pb-6 mb-0 custom-smaller-mobile-text">
          Whoopsie Derpies is an NFT art collection deployed to the Ethereum <strong>Rinkeby</strong> Testnet. Inspired
          by drawing animals for our twin toddlers whilst getting bumped around and receiving conflicting requests. The
          animals are cute and just a little bit derpy. View minted collection on{" "}
          <a href="https://testnets.opensea.io/collection/whoopsiederpies" target="_blank" rel="noreferrer">
            Opensea (rinkeby testnet)
          </a>
          .
        </h2>

        <div className="is-flex is-flex-wrap-wrap is-justify-content-center mb-6 custom-mobile-margin">
          <figure className="image is-96x96 mr-2 custom-mobile-img">
            <img src={Beaver} alt="" />
          </figure>
          <figure className="image is-96x96 mr-2 custom-mobile-img">
            <img src={Bunny} alt="" />
          </figure>
          <figure className="image is-96x96 mr-2 custom-mobile-img">
            <img src={Cat} alt="" />
          </figure>
          <figure className="image is-96x96 mr-2 custom-mobile-img">
            <img src={Cheetah} alt="" />
          </figure>
          <figure className="image is-96x96 mr-2 custom-mobile-img">
            <img src={Elephant} alt="" />
          </figure>
          <figure className="image is-96x96 mr-2 custom-mobile-img">
            <img src={Flamingo} alt="" />
          </figure>
          <figure className="image is-96x96 mr-2 custom-mobile-img">
            <img src={Fox} alt="" />
          </figure>
          <figure className="image is-96x96 mr-2 custom-mobile-img">
            <img src={Giraffe} alt="" />
          </figure>
          <figure className="image is-96x96 mr-2 custom-mobile-img">
            <img src={Hedgie} alt="" />
          </figure>
          <figure className="image is-96x96 mr-2 custom-mobile-img">
            <img src={Horse} alt="" />
          </figure>
          <figure className="image is-96x96 mr-2 custom-mobile-img">
            <img src={Lemur} alt="" />
          </figure>
          <figure className="image is-96x96 mr-2 custom-mobile-img">
            <img src={Llama} alt="" />
          </figure>
          <figure className="image is-96x96 mr-2 custom-mobile-img">
            <img src={Narwhal} alt="" />
          </figure>
          <figure className="image is-96x96 mr-2 custom-mobile-img">
            <img src={Octopus} alt="" />
          </figure>
          <figure className="image is-96x96 mr-2 custom-mobile-img">
            <img src={Orca} alt="" />
          </figure>
          <figure className="image is-96x96 mr-2 custom-mobile-img">
            <img src={Pig} alt="" />
          </figure>
          <figure className="image is-96x96 mr-2 custom-mobile-img">
            <img src={Rhino} alt="" />
          </figure>
          <figure className="image is-96x96 mr-2 custom-mobile-img">
            <img src={Sandpiper} alt="" />
          </figure>
          <figure className="image is-96x96 mr-2 custom-mobile-img">
            <img src={Shark} alt="" />
          </figure>
          <figure className="image is-96x96 mr-2 custom-mobile-img">
            <img src={Squirrel} alt="" />
          </figure>
        </div>
      </section>

      <section className="section pt-0">
        <div className="is-flex is-justify-content-center is-align-items-center is-flex-wrap-wrap">
          <div>
            <figure className="image custom-about-img">
              <img src={Cheetah} alt="" />
            </figure>
          </div>
          <div className="custom-about-text p-5">
            <h1 className="title">Development Details</h1>
            <p className="pb-2 custom-smaller-mobile-text">
              The Whoospie Derpies smart contract follows the ERC721 Non-Fungible Token Standard. Development details
              are as follows:
            </p>
            <ul className="pb-2 custom-details-list custom-smaller-mobile-text">
              <li>Inherits from OpenZeppelin's ERC721Enumerable and Ownable interfaces.</li>
              <li>
                Inherits from Chainlink's VRFConsumerBase to obtain verifiable random numbers on-chain and assign a
                random animal with the result.
              </li>
              <li>Metadata and images are stored on IPFS and pinned using Pinata.</li>
            </ul>
            <p className="custom-smaller-mobile-text">
              View the entire project code at this
              <a href="https://github.com/nmfretz" target="_blank" rel="noreferrer">
                {" "}
                github repository.
              </a>{" "}
              Verified smart contract code is also viewable on Rinkeby Etherscan{" "}
              <a
                href="https://rinkeby.etherscan.io/address/0xFae806Ef5fDadCBa0db4716228EC625d1FC64196"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
              .
            </p>
          </div>
        </div>

        <div className="is-flex is-justify-content-center is-align-items-center is-flex-wrap-wrap">
          <div className="custom-about-text p-5">
            <h1 className="title">Derpies Details</h1>
            <p className="pb-2 custom-smaller-mobile-text">
              A total of 500 Whoopsie Derpies can be minted on-chain. There are 20 unique animals that are possible to
              mint: Beaver, Bunny, Cat, Cheetah, Elephant, Flamingo, Fox, Giraffe, Hedgehog, Horse, Lemur, Llama,
              Narwhal, Octopus, Orca, Pig, Rhino, Sandpiper, Shark, and Squirrel.
            </p>
            <p>
              The specific animal you mint is determined during the minting process, using{" "}
              <a href="https://docs.chain.link/docs/chainlink-vrf/" target="_blank" rel="noreferrer">
                Chainlink's VRF
              </a>{" "}
              to introduce randomness.
            </p>
          </div>
          <div>
            <figure className="image custom-about-img">
              <img src={Hedgie} alt="" />
            </figure>
          </div>
        </div>
        <div className="is-flex is-justify-content-center">
          <button className="button" onClick={mintPageHandler}>
            Ready to Mint a Whoospie Derpie?
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
