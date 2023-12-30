import { Router } from "express";
import { verifyTransaction } from "../controllers/payment.controller";

const paymentRoutes: Router = Router();

/**
 * @routes Payment Routes
 */

paymentRoutes.post("/verify", verifyTransaction);

export default paymentRoutes;
