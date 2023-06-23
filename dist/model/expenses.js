"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ExpenseSchema = new mongoose_1.Schema({
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Health', 'Bills', 'Grocery', 'Travel', 'Others'],
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Expense", ExpenseSchema);
