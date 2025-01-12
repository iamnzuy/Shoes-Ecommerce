import Joi from "joi";
export async function checkProduct(req,res,next) {
  
  let schema=Joi.object({
     name: Joi.string().min(4).max(30).required(),
     price: Joi.required(),
     description: Joi.string().min(10),
     brand: Joi.string().required(),
  }).unknown(true)
  try {
    await schema.validateAsync(req.body)
    if (!req.file) {
        throw new Error('there should be at least 1 image')
    }
    next();
  } catch (error) {
      next(error)
  }
}
