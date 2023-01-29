import { Router } from "express";
import ProductModel from "../dao/models/products.models.js";


export const viewsRouter = Router();

viewsRouter.get("/", async (req, res) => {
  const {page} = req.query
  const products = await ProductModel.paginate({},{limit: 3, page});
  res.json(products);
 
});

viewsRouter.get("/pagination",(req, res) => {
  res.render("pagination", {});
});