import { Router } from "express";

import {
  getExpensesHistory,
  saveExpense,
  getExpensesSummary,
} from "../controllers/expenses";

const router = Router();

router.get("/history", getExpensesHistory);
router.get("/summary", getExpensesSummary);
router.post("/", saveExpense);

export default router;
