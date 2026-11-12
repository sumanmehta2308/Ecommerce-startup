export const getCartForUser = (req, res,next) => {
  try
  {
  res.send(`Fetching cart for user with ID: ${req.params.userId}`);
  }
  catch(error)
  {
    next(error);
  }
};
export const addProductToCart = (req, res,next) => {
  try
  {
  res.send(`Adding product to cart for user with ID: ${req.params.userId}`);
}
catch(error)
  {
    next(error);
  }
};
