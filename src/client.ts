import { Avalanche, BinTools } from "@flarenetwork/flarejs";
import { PlatformVMAPI } from "@flarenetwork/flarejs/dist/apis/platformvm";

const host = process.env.NODE_HOST;
const port = 9650;
const protocol = "http";

const avalanche: Avalanche = new Avalanche(
  host,
  port,
  protocol,
  12345,
  "What is my purpose? You pass butter. Oh my god.",
  undefined,
  undefined,
  false
);

export const info = avalanche.Info();
export const platformVMApi = new PlatformVMAPI(avalanche, "/ext/bc/P");
export const bintools: BinTools = BinTools.getInstance();
