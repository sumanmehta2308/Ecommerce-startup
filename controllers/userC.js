export const getAllUsers = (req, res,next) => {
  try
  {
  res.send("Fetching all users");
  }
catch(error)
  {
    next(error);
  }
};
export const addUser = (req, res,next) => {
  try
  {
  res.send("Adding a new user");
  }
catch(error)
  {
    next(error);
  }
};
export const getUserById = (req, res,next) => {
  try
  {
  res.send(`Fetching user with ID: ${req.params.id}`);
  }
catch(error)
  {
    next(error);
  }
};
