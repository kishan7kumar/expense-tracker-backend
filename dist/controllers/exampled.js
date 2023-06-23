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
exports.saveExampleData = exports.getExampleSummary = exports.getExampleHistory = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const example_1 = __importDefault(require("../model/example"));
const getExampleHistory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allData = yield example_1.default.find({}, { category: 1, _id: 0, amount: 1, createdAt: 1 });
    res.json(allData);
});
exports.getExampleHistory = getExampleHistory;
const getExampleSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allData = yield example_1.default.aggregate([
        { $group: { _id: "$category", amount: { $sum: "$amount" } } },
    ]);
    res.json(allData);
});
exports.getExampleSummary = getExampleSummary;
const saveExampleData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, category } = req.body;
        // const exampleData = await example.findOne({});
        // if (exampleData) return next(createHttpError(406, "example already there"));
        const newExample = new example_1.default({ amount, category });
        const savedItem = yield newExample.save();
        res.json(savedItem);
    }
    catch (error) {
        return next(http_errors_1.default.InternalServerError);
    }
});
exports.saveExampleData = saveExampleData;
