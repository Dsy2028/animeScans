import  express  from "express";
import { scanSite } from "../scanSite.js";

const router = express.Router();

router.get('/scan', scanSite)

export default router;