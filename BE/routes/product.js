import express from "express";
import { verifyToken, verifyAdmin } from "../middleware/verify.js";
import { upload } from "../utils/upload.js";
import { checkProduct } from "../validator/product.js";
import {
  createProduct,
  deleteProduct,
  editProduct,
  sendAllProducts,
  sendProducts,
  sendSingleProducts,
} from "../controller/product.js";
let Route = express.Router();

Route.post("/create", upload.single("image"), checkProduct, createProduct);
//, verifyToken, verifyAdmin
Route.delete("/:id", verifyToken, verifyAdmin, deleteProduct);
Route.get("/all", sendAllProducts);
Route.get("/single/:id", sendSingleProducts);
Route.get("/", sendProducts);
Route.put("/update/:id", upload.single("image"), editProduct);

export default Route;
