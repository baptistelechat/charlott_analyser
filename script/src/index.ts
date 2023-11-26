import chalk from "chalk";
import dotenv from "dotenv";
import os from "os";
import getConsumers from "./data/utils/getConsumers";
import getSessionToken from "./data/utils/getSessionToken";

// OS
const systemOS = os.platform();

console.log(`💻 ${systemOS}`);
console.log("");

// Load environment variables from .env file
dotenv.config();

(async () => {
  const sessionToken = await getSessionToken();
  if (sessionToken) {
    // Session Token
    console.log(chalk.underline("🔑 Session Token : "));
    console.log(sessionToken);
    console.log("");

    // Consumer List
    const consumers = await getConsumers(sessionToken);
    console.log(`👥 ${consumers.length} Clients / Clientes`);
    console.log("");
  }
})();
