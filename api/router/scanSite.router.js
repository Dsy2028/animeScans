import  express  from "express";
import { scanSite } from "../scanSite.js";
import { sendEmail } from "../sendEmail.js";

const router = express.Router();

router.get('/scan', scanSite)
router.post('/email',sendEmail)

export default router;