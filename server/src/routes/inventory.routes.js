import { Router } from "express";
import {
  createInventory,
  deleteInventory,
  getAllInventory,
  getInventoryById,
  updateInventory,
} from "../controllers/inventory.controller.js";

const router = Router();

router.route("/create").post(createInventory);
router.route("/:id").patch(updateInventory);
router.route("/update-batch").patch(updateInventory);

router.route("/:id").delete(deleteInventory);
router.route("/all").get(getInventoryById);
router.route("/all").get(getAllInventory);

export default router;
