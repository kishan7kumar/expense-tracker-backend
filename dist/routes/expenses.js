"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expenses_1 = require("../controllers/expenses");
const router = (0, express_1.Router)();
router.get("/history", expenses_1.getExpensesHistory);
router.get("/summary", expenses_1.getExpensesSummary);
router.post("/", expenses_1.saveExpense);
exports.default = router;
