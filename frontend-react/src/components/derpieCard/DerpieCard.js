import Logo from "../../img/Logo.png";
import DerpieAttribute from "./DerpieAttribute";

import beaver from "../../img/derpie_img/Beaver.png";
import bunny from "../../img/derpie_img/Bunny.png";
import kitty from "../../img/derpie_img/Cat.png";
import cheetah from "../../img/derpie_img/Cheetah.png";
import elephant from "../../img/derpie_img/Elephant.png";
import flamingo from "../../img/derpie_img/Flamingo.png";
import fox from "../../img/derpie_img/Fox.png";
import giraffe from "../../img/derpie_img/Giraffe.png";
import hedgie from "../../img/derpie_img/Hedgie.png";
import horsie from "../../img/derpie_img/Horse.png";
import lemur from "../../img/derpie_img/Lemur.png";
import llama from "../../img/derpie_img/Llama.png";
import narwhal from "../../img/derpie_img/Narwhal.png";
import octopus from "../../img/derpie_img/Octopus.png";
import orca from "../../img/derpie_img/Orca.png";
import piggie from "../../img/derpie_img/Pig.png";
import rhinoceros from "../../img/derpie_img/Rhino.png";
import sandpiper from "../../img/derpie_img/Sandpiper.png";
import shark from "../../img/derpie_img/Shark.png";
import squirrel from "../../img/derpie_img/Squirrel.png";

const fallBackImages = {
  beaver,
  bunny,
  kitty,
  cheetah,
  elephant,
  flamingo,
  fox,
  giraffe,
  hedgie,
  horsie,
  lemur,
  llama,
  narwhal,
  octopus,
  orca,
  piggie,
  rhinoceros,
  sandpiper,
  shark,
  squirrel,
};

const DerpieCard = ({ derpieDetails }) => {
  const imgURI = `https://ipfs.io/ipfs/${derpieDetails.uriJSON.image.split("").splice(7).join("")}`;
  const style = { backgroundColor: `#${derpieDetails.uriJSON.background_color}` };
  return (
    <>
      <div className="card custom-card">
        <div className="card-image">
          <figure style={style} className="image is-4by4">
            {/*onError in case ipfs img url does not work */}
            <img
              src={imgURI}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallBackImages[derpieDetails.uriJSON.name];
              }}
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img src={Logo} alt="Whoosie Derpies Logo" />
              </figure>
            </div>
            <div className="media-left has-text-left">
              <p className="title is-4 mb-0 is-capitalized">{derpieDetails.uriJSON.name}</p>
              <p className="">{`Token ID: ${derpieDetails.tokenId}`}</p>
            </div>
          </div>

          <div className="content field is-grouped is-flex">
            <DerpieAttribute derpieDetails={derpieDetails} traitNum={0} />
            <DerpieAttribute derpieDetails={derpieDetails} traitNum={1} />
            <DerpieAttribute derpieDetails={derpieDetails} traitNum={2} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DerpieCard;
