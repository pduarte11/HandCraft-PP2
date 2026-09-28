import { Router } from "express";
import * as clienteController from "../controllers/clienteController";

const router = Router();

router.get("/", clienteController.list);
router.get("/:id", clienteController.getById);
router.post("/", clienteController.create);
router.put("/:id", clienteController.update);
router.delete("/:id", clienteController.remove);

export default router;
