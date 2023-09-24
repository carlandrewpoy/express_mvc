import { Router } from "express"
import {
  addContact,
  deleteContact,
  getContacts,
  updateContact,
  viewContact,
} from "../controllers/contactController.js"

const router = Router()

router.get("/", getContacts)
router.get("/:id", viewContact)
router.post("/", addContact)
router.put("/:id", updateContact)
router.delete("/:id", deleteContact)

export default router
