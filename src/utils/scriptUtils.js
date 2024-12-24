const removeWhiteSpace = (body) => {
  Object.keys(body).forEach((key) => {
    if (typeof body[key] === "string") {
      body[key] = body[key].trim();
    }
  });
  return body;
};

export { removeWhiteSpace };
