const genereatePassword = (body) => {
  const { name, phone } = body;
  if (!name || !phone) {
    throw new Error(
      "Missing required fields to generate the default password."
    );
  }
  const password = `${name.split(" ")[0]}.${name.split(" ")[1]}.${phone.slice(-3)}`;
  return password;
};

export const passwordUtils = { genereatePassword };
