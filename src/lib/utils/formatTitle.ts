const formatTitle = (pathname: string) => {
  if (pathname === "/dashboard") {
    return "Dashboard"; // Si c'est "/dashboard", renvoie simplement "Dashboard"
  }

  const words = pathname.replaceAll("dashboard", "").split("/").filter(Boolean); // Divise la chaîne à chaque '/' et supprime les éléments vides

  const formattedWords = words.map((word) => {
    const trimmedWord = word
      .trim()
      
      .replaceAll("-", " "); // Enlève les tirets et espaces supplémentaires
    return trimmedWord.charAt(0).toUpperCase() + trimmedWord.slice(1); // Met la première lettre en majuscule
  });

  return formattedWords.join(" / "); // Rejoins les mots formatés avec '/'
};

export default formatTitle;
