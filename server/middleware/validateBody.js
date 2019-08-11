module.exports = (validator) => {
  /**
   * Joi validator middleware. Get validator function as parameter
   * and return middleware function, which validate client data
   */

  return (req, res, next) => {
    const { error, value } = validator(req.body);
    if (error) return res.status(400).send({error: error.details[0].message});
    req.value = value;
    next();
  }
};