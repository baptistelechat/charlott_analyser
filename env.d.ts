declare namespace NodeJS {
  interface ProcessEnv {
    HEADLESS: "0" | "1";
    APP_LOGIN: string;
    APP_PASSWORD: string;
    CODE_VENDEUR: string;
  }
}
