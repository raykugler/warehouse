module.exports = (validator, property='body', key='value') => {
  /**
   * Joi validator middleware. Get validator function as parameter
   * and return middleware function, which validate client data
   */

  return (req, res, next) => {
    const { error, value } = validator(req[property]);
    if (error) return res.status(400).send({error: error.details[0].message});
    req[key] = value;
    next();
  }
};