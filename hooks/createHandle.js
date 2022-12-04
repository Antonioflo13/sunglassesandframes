const createHandle = title => {
  const specialCharacter = title.match("[^A-Za-z0-9/ +/]");
  return title
    .toLowerCase()
    .replaceAll(specialCharacter && specialCharacter[0], "")
    .replaceAll(" ", "-")
    .replaceAll("--", "-")
    .trim();
};

export default createHandle;
