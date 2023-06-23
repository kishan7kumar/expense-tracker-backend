import { RequestHandler } from "express";
import createHttpError from "http-errors";
import expense from "../model/expenses";

export const getExpensesHistory: RequestHandler = async (req, res, next) => {
  const expensesList = await expense.find(
    {},
    { category: 1, _id: 0, amount: 1, createdAt: 1 }
  ).sort({createdAt: -1});
  res.json(expensesList);
};

export const getExpensesSummary: RequestHandler = async (req, res, next) => {
  const expenseSummaryList = await expense.aggregate([
    { $group: { _id: "$category", amount: { $sum: "$amount" } } },
  ]).sort({_id: 1});
  res.json(expenseSummaryList);
};

export const saveExpense: RequestHandler = async (req, res, next) => {
  try {
    const { amount, category }: IExpense = req.body;
    const newExpenseItem = new expense({ amount, category });
    const savedExpenseItem = await newExpenseItem.save();
    io.emit("tableUpdated");
    res.json(savedExpenseItem);
  } catch (error) {
    return next(createHttpError(500, "Internal Server Error"));
  }
};
