import { Avalanche, BinTools } from "@flarenetwork/flarejs";
import { PlatformVMAPI } from "@flarenetwork/flarejs/dist/apis/platformvm";
import { getAddress } from "@ethersproject/address";

const ip = "44.207.63.76";
const port: number = 9650;
const protocol: string = "http";

const avalanche: Avalanche = new Avalanche(
  ip,
  port,
  protocol,
  12345,
  "What is my purpose? You pass butter. Oh my god.",
  undefined,
  undefined,
  false
);

const info = avalanche.Info();
const api = new PlatformVMAPI(avalanche, "/ext/bc/P");
const bintools: BinTools = BinTools.getInstance();

const main = async () => {
  console.log("");

  const result = await info.getBlockchainID("X");
  console.log(`Blockchain ID: ${result}`);
  console.log("");

  const height = await api.getHeight();
  console.log(`Height: ${height}`);
  console.log("");

  const validators = (await api.getValidatorsAt(height.toNumber())).validators;
  console.log(`validators: `);
  for (const validatorKey in validators) {
    console.log(`${validatorKey}: ${validators[validatorKey]}`);
  }
  console.log("");

  const validatorsCurrent = ((await api.getCurrentValidators()) as any)
    .validators;
  console.log(`validators:`);
  for (const validator of validatorsCurrent) {
    const address = bintools.stringToAddress(
      validator.rewardOwner.addresses[0]
    );
    const checksumAddress = getAddress(`0x${address.toString("hex")}`);

    console.log(`${validator.nodeID}: ${checksumAddress}`);
  }
  console.log("");
};

main();
