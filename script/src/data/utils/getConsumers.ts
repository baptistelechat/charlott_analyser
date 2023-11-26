const getConsumerList = async (sessionToken: string) => {
  const vendorCode = process.env.APP_LOGIN as string;

  if (vendorCode) {
    const formatVendorCode = vendorCode.padStart(8, "0");

    const response = await fetch(
      "https://appli.charlott.fr/ws/fr_liste_consommateur",
      {
        headers: {
          accept: "application/json, text/javascript, */*; q=0.01",
          "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "sec-ch-ua":
            '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
        },
        referrer: "https://appli.charlott.fr/?actif=1",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: `format=json&token=${sessionToken}&limit=0&locale=fr-FR&dos=gch&page=0&code_vendeur=${formatVendorCode}&q=&actif%5B%5D=1&type_conso=&rdv_conso=&mois_anniv=&p=`,
        method: "POST",
        mode: "cors",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP! Statut: ${response.status}`);
    }

    const data = await response.json(); // Conversion de la réponse en JSON
    return data;
  }

  return [];
};

export default getConsumerList;
