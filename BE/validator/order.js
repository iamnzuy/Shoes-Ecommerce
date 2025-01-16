import Joi from "joi";
export async function checkOrder(req,res,next) {
 req.body.items=JSON.parse(req.body.items);
  let schema=Joi.object({
   items: Joi.array().required(),
   totalPrice: Joi.number().required() 
  }).unknown(true)
  try {
    await schema.validateAsync(req.body)
    next();
  } catch (error) {
      next(error) 
  }
}

// .items(Joi.object({
//   product: Joi.string().required,
//   quantity: Joi.number().required
// }))