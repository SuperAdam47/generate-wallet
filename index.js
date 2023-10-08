const ethers = require("ethers");
const fs = require("fs");

COUNTS = 10;

wallets = [];
for (let i = 0; i < COUNTS; i++) {
  const wallet = ethers.Wallet.createRandom();
  wallets.push(wallet);
}

const csv = wallets
  .map((wallet) => `${wallet.address},${wallet.privateKey}`)
  .join("\n");

// Write CSV to file
fs.writeFile("wallets.csv", csv, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Wallets saved to wallets.csv");
  }
});
