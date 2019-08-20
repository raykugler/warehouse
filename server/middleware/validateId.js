module.exports = (error) => {
  /**
   * Validate object id, if id in the path does not match
   * with id in body return en error
   */

  return (req, res, next) => {

    if (!req.body._id) req.body._id = req.params.id;

    if (req.body._id !== req.params.id)
      return res.status(400).send({error});

    next();
  }
};