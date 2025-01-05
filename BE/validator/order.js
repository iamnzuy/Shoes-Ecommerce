import Joi from "joi";
export async function checkOrder(req,res,next) {
  
  let schema=Joi.object({
     product: Joi.string().required(),
     quantity: Joi.required()
  }).unknown(true)
  try {
    await schema.validateAsync(req.body)
    next();
  } catch (error) {
      next(error)
  }
}