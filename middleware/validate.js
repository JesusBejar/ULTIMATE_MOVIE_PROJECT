const validator = require("../validator/validator");

const validateUserData = (req, res, next) => {
    const rules = {
      name: 'required|string',
      email: 'required|email',
      password: 'required|string|min:6',
    };
  
    validator(req.body, rules, (errors, isValid) => {
      if (isValid) {
        next();
      } else {
        res.status(400).json({ errors });
      }
    });
  };
  
  module.exports = validateUserData;