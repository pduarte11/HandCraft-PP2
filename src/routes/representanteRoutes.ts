import { Router } from "express";
import * as representanteController from "../controllers/representanteController";

const router = Router();

router.get("/", representanteController.list);
router.get("/:id", representanteController.getById);
router.post("/", representanteController.create);
router.put("/:id", representanteController.update);
router.delete("/:id", representanteController.remove);

export default router;
