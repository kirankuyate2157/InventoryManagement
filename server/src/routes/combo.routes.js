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
// router.route("/:id").post(addItemToCombo);

router.route("/update-item/:comboId/:itemId").patch(updateComboItem);

// router.route("/delete/:id").delete(deleteCombo);

// router.route("/:id").get(getComboById);
router.route("/all").get(getAllCombos);

export default router;
