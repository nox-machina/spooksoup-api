const jwt = require("jsonwebtoken");

const generateToken = (response, id, tknSalt) => {
  const payload = {
    user: {
      id: id,
      salt: tknSalt,
    },
  };

  try {
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "1 hour",
    });
    return token;
  } catch (error) {
    return response.status(500).send({ error: "Something went wrong." });
  }
};


module.exports = {
    generateToken
}