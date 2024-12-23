const genereatePassword = (body) => {
  const { name, phone } = body;
  if (!name || !phone) {
    throw new Error(
      "Missing required fields to generate the default password."
    );
  }
  const lowerCaseName = name.toLowerCase();

  const password = `${lowerCaseName.split(" ")[0]}.${lowerCaseName.split(" ")[1]}.${phone.slice(-3)}`;
  return password;
};

export const passwordUtils = { genereatePassword };
