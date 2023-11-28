const formatTitle = (pathname: string) => {
  const title =
    pathname === "/dashboard"
      ? pathname.replaceAll("/", "")
      : pathname
          .replaceAll("-", " ")
          .replaceAll("dashboard", "")
          .replaceAll("/", "");

  return `${title[0].toUpperCase()}${title.slice(1)}`;
};

export default formatTitle;
