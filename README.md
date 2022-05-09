# Whoopsie Derpies NFT - Solidity, Hardhat, React

Whoopsie Derpies is an NFT art collection deployed to the Ethereum <strong>Rinkeby</strong> testnet. Inspired by drawing animals for our twin toddlers whilst getting bumped around and receiving conflicting requests. The animals are cute and just a little bit derpy.

A total of 500 Whoopsie Derpies can be minted on-chain. There are 20 unique animals that are possible to mint: Beaver, Bunny, Cat, Cheetah, Elephant, Flamingo, Fox, Giraffe, Hedgehog, Horse, Lemur, Llama, Narwhal, Octopus, Orca, Pig, Rhino, Sandpiper, Shark, and Squirrel.

The specific animal you mint is determined during the minting process, using Chainlink's VRF to introduce randomness.

Front end currently deployed at https://whoopsiederpies721rinkeby.netlify.app.

Smart contract deployed to the Ethereum Rinkeby testnet at contract address 0xFae806Ef5fDadCBa0db4716228EC625d1FC64196. View verified contract at https://rinkeby.etherscan.io/address/0xFae806Ef5fDadCBa0db4716228EC625d1FC64196

View minted Derpies collection at https://testnets.opensea.io/collection/whoopsiederpies.

<kbd> 
<img src="https://user-images.githubusercontent.com/85373263/151077354-687e5077-bb37-4d64-8413-be4fe911ea24.png"/>
</kbd>
<br />
<br />
<kbd> 
<img src="https://user-images.githubusercontent.com/85373263/151050231-ff4aca7b-12db-4d5d-9f6b-9c7f25620c8c.png"/>
</kbd>

### Features & Design

#### Frontend

- React Framework for frontend build.
- Bulma.io CSS framework
- ethers.js and Moralis libraries for interacting with Ethereum.
- Error handling and notifications to help the user navigate the wait-times associated with blockchains and oracles.

#### Smart Contract

- Contract written in Solidity.
- Contract follows the ERC721 Non-Fungible Token Standard.
- Inherits from OpenZeppelin's ERC721Enumerable and Ownable interfaces.
- Inherits from Chainlink's VRFConsumerBase to obtain verifiable random numbers on-chain and assign a random animal with the result.
- Metadata and images are stored on IPFS and pinned using Pinata.
- Hardhat development environment used for compiling, testing, and deployment.

### TODOS

#### Frontend

- [ ] break out functions into lib folder
- [ ] add wallet connect functionality for mobile
- [ ] Listen for `MintedDerpie` contract event in frontend `mintDerpie` function to know when the Chainlink VRF has responded with randomness. Currently I wait 5 minutes using frontend function `waitForChainlinkVRF` before attempting to show the user their newly minted Derpie.
- [x] reduce image file sizes for faster loading.

#### Smart Contract

- [ ] For next solidity contract: add additional logic in hardhat files for easier deployment to different networks (testnets vs localhost vs mainnet etc...)

# Setup

Run `npm install` in the following directories:

- `frontend-react`
- `smart-contract-hardhat`

Rename `.env.example` to `.env` and update with your values as follows:

- smart-contract-hardhat:
  - name of your erc721 token
  - symbol of your erc721 token
  - base uri of your erc721 token
  - eth price of your erc721 token
  - link token rinkeby address
  - chainlink vrfCoordinator rinkeby address
  - chainlik vrfCoordinator rinkeby keyhash
  - chainlik vrfCoordinator rinkeby fee
  - infura url
  - private key
  - etherscan api key
- frontend-react:

  - address of your derpies contract deployed to hardhat localhost
  - address of your VRFCoorinatorMock contract deployed to hardhat localhost
  - address of your derpies contract deployed to rinkeby testnet

# Development

### Smart Contract

Deploy smart contract to a localhost hardhat network:

```
cd smart-contract-hardhat
npx hardhat node
npx hardhat run scripts/deploy_localhost.js --network localhost
```

### Frontend React App

Start frontend with react-app

```
cd frontend-react
npm run start
```

Make sure to import correct correct contract abi to `App.js` from `contracts/`

Make sure to use the correct `DERPIES_ADDRESS` variable in `constants.js` for development:

- Comment out `const DERPIES_ADDRESS = process.env.REACT_APP_DERPIES_ADDRESS_RINKEBY;`
- Uncomment `const DERPIES_ADDRESS = process.env.REACT_APP_DERPIES_ADDRESS_LOCALHOST;`

# Deployment

### Smart Contract

Smart contract deployed to the Ethereum Rinkeby testnet at contract address 0xFae806Ef5fDadCBa0db4716228EC625d1FC64196. View verified contract at https://rinkeby.etherscan.io/address/0xFae806Ef5fDadCBa0db4716228EC625d1FC64196

Deploy smart contract to the ethereum rinkeby testnet:

```
cd smart-contract-hardhat
npx hardhat node
npx hardhat run scripts/deploy_rinkeby.js --network rinkeby
```

### Frontend

Front end currently deployed to netlify at https://whoopsiederpies721rinkeby.netlify.app.

Make sure to import correct correct contract abi to `App.js` from `contracts/`

Make sure to use the correct `DERPIES_ADDRESS` variable in `constants.js` for deployment:

- Comment out `const DERPIES_ADDRESS = process.env.REACT_APP_DERPIES_ADDRESS_LOCALHOST;`
- Uncomment `const DERPIES_ADDRESS = process.env.REACT_APP_DERPIES_ADDRESS_RINKEBY;`

Build the frontend for production with `npm run build`. Deploy the `build` folder.

# Screenshots

<kbd> 
<img src="https://user-images.githubusercontent.com/85373263/151077354-687e5077-bb37-4d64-8413-be4fe911ea24.png"/>
</kbd>
<br />
<br />
<kbd> 
<img src="https://user-images.githubusercontent.com/85373263/151050177-d150fb6e-e9d4-45f2-ab73-72fe1e8e9fc9.png"/>
</kbd>
<br />
<br />
<kbd> 
<img src="https://user-images.githubusercontent.com/85373263/151050220-07a11d16-deeb-480e-9b6f-e2c74372f174.png"/>
</kbd>
<br />
<br />
<kbd> 
<img src="https://user-images.githubusercontent.com/85373263/151050224-beee169d-bdc2-4ad3-8fd6-92440cbea503.png"/>
</kbd>
<br />
<br />
<kbd> 
<img src="https://user-images.githubusercontent.com/85373263/151050231-ff4aca7b-12db-4d5d-9f6b-9c7f25620c8c.png"/>
</kbd>
<br />
<br />
<kbd> 
<img src="https://user-images.githubusercontent.com/85373263/151050211-91ac4ab7-1934-4ee8-902b-9a061d572f28.png"/>
</kbd>
