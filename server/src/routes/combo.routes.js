import { Router } from "express";

import {
    createCombo,
    deleteCombo,
    updateComboItem,
    addItemToCombo,
    getAllCombos,
    getComboById,
} from "../controllers/combo.controller.js";

const router = Router();

router.route("/create").post(createCombo);
router.route("/:id").post(addItemToCombo);

router.route("/update-item/:comboId/:itemId").patch(updateComboItem);

router.route("/:id").delete(deleteCombo);

router.route("/all").get(getAllCombos);
router.route("/:id").get(getComboById);

export default router;
