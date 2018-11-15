const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema and model

const expenseSchema = new Schema({
    expense: String,
    value: Number,
})

const newExpense = mongoose.model('uber', expenseSchema);

export default newExpense;