import puppeteer from "puppeteer";

const getSessionToken = async () => {
  try {
    let browser;
    let token: string = "";

    if (process.env.HEADLESS === "1") {
      browser = await puppeteer.launch({
        args: ["--no-sandbox"],
        headless: "new",
      });
    }

    if (process.env.HEADLESS === "0") {
      browser = await puppeteer.launch({
        args: ["--no-sandbox"],
        defaultViewport: { width: 1920, height: 1080 },
        headless: false,
      });
    }

    if (browser) {
      const page = await browser.newPage();

      // Activer l'interception des requêtes
      await page.setRequestInterception(true);

      page.on("request", async (interceptedRequest) => {
        // Filtrer les requêtes XHR ou fetch
        if (
          (interceptedRequest.resourceType() === "xhr" ||
            interceptedRequest.resourceType() === "fetch") &&
          interceptedRequest.url().includes("fr_liste_dossiers")
        ) {
          const postData = interceptedRequest.postData();
          if (postData) {
            token = postData
              .split("&format")[0]
              .replaceAll("token=", "");
          }
        }
        interceptedRequest.continue();
      });

      await page.goto("https://appli.charlott.fr/");

      // Remplir les champs de connexion
      await page.waitForSelector("#loginID");
      await page.type("#loginID", process.env.APP_LOGIN as string);
      await page.waitForSelector("#loginPasswd");
      await page.type("#loginPasswd", process.env.APP_PASSWORD as string);

      // Cliquer sur le bouton de connexion
      await page.click("#loginSubmitButton");

      // Mes ateliers style
      await page.waitForSelector(
        "#home > div:nth-child(2) > ul > li:nth-child(3) > a"
      );

      // Cliquer sur le bouton de connexion
      await page.click("#home > div:nth-child(2) > ul > li:nth-child(3) > a");

      // Effectue tes actions sur la page après la connexion...

      await browser.close();
    }

    return token;
  } catch (error) {
    console.error(
      "Erreur lors de l'exécution de la fonction getSessionToken :",
      error
    );
    return null;
  }
};

export default getSessionToken;
