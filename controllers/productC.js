export const getAllProducts = (req, res,next) => {
  try
  {
  res.send("Fetching all products");
  }
catch(error)
  {
    next(error);
  }
};
export const addProduct = (req, res,next) => {
  try
  {
  res.send("Adding a new product");
  }
catch(error)
  {
    next(error);
  }
};
export const getProductById = (req, res,next) => {
  try
  {
  res.send(`Fetching product with ID: ${req.params.id}`);
  }
catch(error)
  {
    next(error);
  }
};
