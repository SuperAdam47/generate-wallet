const ethers = require("ethers");
const fs = require("fs");
const csv = require("csv-parser");
const provider = new ethers.providers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/49a547b1f17a417f8b7fe8dc8d33308e"
);

const inputFile = "wallets.csv";
const outputFile = "wallets_with_balance.csv";

const headers = ["address", "private_key", "blance"];
fs.writeFileSync(outputFile, "address,private_key,balance\n");

fs.createReadStream(inputFile)
  .pipe(csv())
  .on("data", async (row) => {
    const address = row.address;
    const balance = await getBalance(address);
    const private_key = row.private_key;
    const newRow = [address, private_key, balance];
    writeRow(newRow);
  })
  .on("end", () => {
    console.log("Finished processing CSV file");
  });

async function getBalance(address) {
  const balance = await provider.getBalance(address);
  return ethers.utils.formatEther(balance);
}

function writeRow(row) {
  const line = row.join(",") + "\n";
  fs.appendFileSync(outputFile, line);
}
