import { Router } from "express";
import {
  createInventory,
  deleteInventory,
  getAllInventory,
  getInventoryById,
  updateInventory,
  updateInventoryBatch,
} from "../controllers/inventory.controller.js";

const router = Router();

router.route("/create").post(createInventory);
router.route("/update-batch").patch(updateInventoryBatch);
router.route("/:id").patch(updateInventory);

router.route("/delete/:id").delete(deleteInventory);
router.route("/all").get(getAllInventory);
router.route("/:id").get(getInventoryById);

export default router;
