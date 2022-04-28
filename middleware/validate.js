const Joi = require("joi");

//---- Request validation middleware on request ----//

const isEmail = (value) => {
  const payload = {
    email: value,
  };

  const { error } = Joi.object({
    email: Joi.string().email().required(),
  }).validate(payload);

  if (!error) {
    return true;
  } else {
    return false;
  }
};

const validateSignup = async (req, res, next) => {
  if (Object.keys(req.body).length === 0)
    return res.status(406).send({ error: "Invalid request." });
  if (!req.body.email)
    return res
      .status(406)
      .send({ error: "Invalid request. No email provided." });
  if (!req.body.username)
    return res
      .status(406)
      .send({ error: "Invalid request. No username provided." });
  if (!req.body.password)
    return res
      .status(406)
      .send({ error: "Invalid request. No password provided." });

  if (isEmail(req.body.email)) {
    next();
  } else {
    return res.status(406).send({ error: "Invalid request." });
  }
};

const validateLogin = (req, res, next) => {
  if (Object.keys(req.body).length === 0)
    return res.status(406).send({ error: "Invalid request." });
  if (!req.body.ref)
    return res
      .status(406)
      .send({ error: "Invalid request. No email provided." });

  if (!req.body.password)
    return res
      .status(406)
      .send({ error: "Invalid request. No password provided." });

  next();
};

module.exports = {
  isEmail,
  validateSignup,
  validateLogin,
};
