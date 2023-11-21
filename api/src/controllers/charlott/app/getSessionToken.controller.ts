import { Request, Response } from "express";
import puppeteer from "puppeteer";

const getSessionToken = async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;

    if (login === "" || password === "") {
      return res.status(500).json({
        error: "Erreur lors de la récupération du jeton de session",
        message: "Login or Password is empty",
      });
    }

    let token: string = "";

    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
      headless: "new",
    });

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
            token = postData.split("&format")[0].replaceAll("token=", "");
          }
        }
        interceptedRequest.continue();
      });

      await page.goto("https://appli.charlott.fr/");

      // Remplir les champs de connexion
      await page.waitForSelector("#loginID");
      await page.type("#loginID", login);
      await page.waitForSelector("#loginPasswd");
      await page.type("#loginPasswd", password);

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

    return res.status(200).json({ appSessionToken: token });
  } catch (error: any) {
    return res.status(500).json({
      error: "Erreur lors de la récupération du jeton de session",
      message: error.message,
    });
  }
};

export default getSessionToken;
