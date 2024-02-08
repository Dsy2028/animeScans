import { getSites } from "../scan.controller.js";
import express from "express";

const router = express.Router();

router.get('/sites', getSites);

export default router;