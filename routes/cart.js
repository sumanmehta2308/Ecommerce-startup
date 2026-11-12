import express from "express";
const router = express.Router();
router.post("/:userid", (req, res) => {
  res.send("Adding product to cart for user with ID: userId");
});
router.get("/:userid", (req, res) => {
  res.send(`Fetching cart for user with ID:${req.params.id}.`);
});
export default router;
