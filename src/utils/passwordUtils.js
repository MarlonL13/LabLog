/**
 * Generates a default password based on user's name and phone number
 * @param {Object} body - The request body containing user information
 * @param {string} body.name - The user's full name
 * @param {string} body.phone - The user's phone number
 * @returns {string} A password string in the format "firstname.lastname.lastThreeDigits"
 * @throws {Error} If name or phone are missing from the body
 */
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
