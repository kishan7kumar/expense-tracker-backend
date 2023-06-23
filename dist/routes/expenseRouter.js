"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exampled_1 = require("../controllers/exampled");
const router = (0, express_1.Router)();
router.get("/history", exampled_1.getExampleHistory);
router.get("/summary", exampled_1.getExampleSummary);
router.post("/", exampled_1.saveExampleData);
exports.default = router;
