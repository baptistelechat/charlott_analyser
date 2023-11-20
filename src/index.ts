import chalk from "chalk";
import dotenv from "dotenv";
import os from "os";
import getConsumerList from "./data/utils/getConsumerList";
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
    const consumerList = await getConsumerList(sessionToken);
    console.log(`👥 ${consumerList.length} Clients / Clientes`);
    console.log("");
  }
})();
