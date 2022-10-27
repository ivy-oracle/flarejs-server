import * as express from "express";
import { platformVMApi, bintools } from "./client";
import { getAddress } from "@ethersproject/address";

const app = express();
const port = process.env.PORT ?? 9652;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/validator", async (req, res) => {
  try {
    const validatorsRespond = await platformVMApi.getCurrentValidators();

    const results = [];

    for (const validator of (validatorsRespond as any).validators) {
      const checksumAddresses = validator.rewardOwner.addresses.map(
        (bech32Address) => {
          const address = bintools.stringToAddress(bech32Address);
          return getAddress(`0x${address.toString("hex")}`);
        }
      );

      results.push({
        ...validator,
        rewardOwner: {
          ...validator.rewardOwner,
          checksumAddresses,
        },
      });
    }
    res.json(results);
  } catch (error) {
    console.log(error);
    res.json({ error: "failed to fetch validators" });
  }
});

app.listen(port, () => {
  console.log(`Flarejs server listening on port ${port}`);
});
