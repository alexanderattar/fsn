# Foundation Name Service

This project imagines building a Name Service for Foundation similar to Ethereum's ENS registry. It was developed as a take home challenge as part of an interview process. This code task is designed around building a subgraph to index FNS name data and an idempotent notification system backed by a database table for when they're registered.

ENS/FSN names are registered to the database and notifications are only sent for new names that haven't previously been registered. The Graph is used to index smart-contract events when new names are added. The application is full-stack and includes a very minimal UI for entering names, signing ethereum transactions via MetaMask, and saving the names to the database. Finally, Twilio can be used to send notifications for new names to hardcoded phone numbers, but the application also logs which notifications are sent to the console.

The application is live on [Railway](https://34d973c096fd.up.railway.app/)
The smart-contract viewable on [Etherscan](https://goerli.etherscan.io/address/0x468cE82433c6739d6A36a58F771824C33A656edA)
The subgraph is viewable in [The Graph explorer](https://thegraph.com/explorer/subgraph/alexanderattar/fsn)

## ✨ Features

- React
- Prisma
- NextJS
- Postgres
- TypeScript
- Solidity
- GraphQL
- SWR
- Twilio

## 🚀 How to use

- Visit the [application](https://34d973c096fd.up.railway.app/) and enter ENS names to register on the ethereum network and the backend database.
- Make sure to have MetaMask installed on your browser and connect to the Goerli network before submitting new names.
- Sign the transaction when MetaMask opens. If the transaction is rejected, the name should also not be stored in the PostgreSQL db.
- Navigate to [The Graph Explorer](https://thegraph.com/explorer/subgraph/alexanderattar/fsn) to query the subgraph for the currently registered ENS names.
- The UI also provides the ability to delete names from the database, but this will not remove them from the contract or the subgraph.

## ▶️ Example GraphQL Query

```
{
  ensnames(first: 5) {
    id
    ensName
  }
}
```

## 📝 Project Plan

In the planning stage of the project, here are the steps that I laid out to accomplish:

- [x] Build off typescript eth / boilerplate and integrate Prisma and Next 
- [x] Compile new ESN contract
- [x] Deploy new ESN contract with on Goerli
- [x] Write Event handlers for the graph
- [x] Build and deploy subgraph
- [x] Test setting and getting ESN names via Remix
- [x] Test queries in the graph explorer
- [x] Update Database migrations to create ESN table
- [x] Add logic to call get and set functions on the smart-contract via ethers
- [x] Modify frontend to input ESN names and logic to save to Postgresql after a tx is signed
- [x] Add some hardcoded phone numbers
- [x] Log notification string to each number
- [x] Possibly send texts via Twilio if the name was registered for the first time, otherwise log that it's already registered

## 🤙 Things that went well

- I bootstrapped the project using a [TypeScript/Solidty](https://github.com/alexanderattar/typescript-solidity-dev-starter-kit) dev starter kit which provided a quick way to get up and running.
- Similarly, I used a NextJS/Prisma example project to get up and running with TypeScript connected to PostgreSQL via the Prisma ORM.
    - I had never used Prisma before this project, but I found it to be a nice and ergonomic framework for interacting with the db.
- Ethereum tooling for deploying and interacting with smart-contracts has improved dramatically in the last couple years. Specifically, Hardhat + Ethers + Waffle + Typescript make ethereum development much less painful and buggy than it used to be with Truffle/Web3.
- Some of the newer design patterns with React such as hooks and swr are pretty nice compared to older React projects I've worked on in the past.
- NextJS is also cool and the dev mode with hot reloading made it easy to iterate quickly.

## 🤨 Things that could have gone better

- The instructions for the project mentioned that the contract to connect to on the Goerli network does not have events so the subgraph should use call handlers, but The Graph's call handlers are not supported on the Goerli network. This is the error I got `✖ Failed to deploy to Graph node https://api.thegraph.com/deploy/: Call handlers and call filters are not supported on the goerli network`. I believe this is due to requiring a specific API that only Parity supports.
    - Because of this I ended up modifying to the contract, adding events, and deploying the new version of it to Goerli to interact with and index within the subgraph.
    - I wrote call handlers, but ended up having to disable them.
- The Graph's site seemed to be having issues while I was working on the project.
    - Syncing was slow even when providing the block number of the deployed contract to start at.
    - The explorer often failed to load and I kept randomly getting logged out and had to log back in.
- I ran into some other odd errors such as `graph-node_1  |     Server error: Method trace_filter not supported.), subgraph_id`, but eventually figured it out.
- I used a few new tools and frameworks while building this project which inevitably lead to some scope creep while I navigated a bit of a learning curve. I took the project as a learning opportuntiy though so in the end I feel like it was time well spent.

## 💭 Things to add

- Feedback for being on the wrong network
- Better UI/UX for updating on ethereum transaction status
- Alerts and console logs are used to communicate some of the interactions that are happening such as notifying the user of what's happening under the hood. There should be proper UX built into the frontend instead.
- Better route handling for the Next endpoints
- There might be parts of the app that should conform to stronger type checking
- Experiment more with the Twilio integration
- More testing (currently there are only tests for the smart-contract)


