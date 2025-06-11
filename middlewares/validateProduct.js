const Joi = require('joi');

const productSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  quantity: Joi.number().integer().min(0).required()
});

function validateProduct(req, res, next) {
  const { error } = productSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
}

module.exports = validateProduct;