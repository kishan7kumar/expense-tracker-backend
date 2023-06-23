"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveExpense = exports.getExpensesSummary = exports.getExpensesHistory = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const expenses_1 = __importDefault(require("../model/expenses"));
const getExpensesHistory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const expensesList = yield expenses_1.default.find({}, { category: 1, _id: 0, amount: 1, createdAt: 1 }).sort({ createdAt: -1 });
    res.json(expensesList);
});
exports.getExpensesHistory = getExpensesHistory;
const getExpensesSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const expenseSummaryList = yield expenses_1.default.aggregate([
        { $group: { _id: "$category", amount: { $sum: "$amount" } } },
    ]).sort({ _id: 1 });
    res.json(expenseSummaryList);
});
exports.getExpensesSummary = getExpensesSummary;
const saveExpense = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, category } = req.body;
        const newExpenseItem = new expenses_1.default({ amount, category });
        const savedExpenseItem = yield newExpenseItem.save();
        io.emit("tableUpdated");
        res.json(savedExpenseItem);
    }
    catch (error) {
        return next((0, http_errors_1.default)(500, "Internal Server Error"));
    }
});
exports.saveExpense = saveExpense;
