import { Schema, model, Document } from "mongoose";

export interface IExpense extends Document {
  amount: number;
  category: string;
}

const ExpenseSchema: Schema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Health', 'Bills', 'Grocery', 'Travel', 'Others'],
    },
  },
  {
    timestamps: true,
  }
);

export default model<IExpense>("Expense", ExpenseSchema);
