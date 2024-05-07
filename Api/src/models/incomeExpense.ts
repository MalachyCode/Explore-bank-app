import mongoose from 'mongoose';

const incomeExpenseSchema = new mongoose.Schema({
  owner: String,
  barData: [
    {
      name: String,
      difference: Number,
      income: Number,
      expensis: Number,
    },
  ],
});

incomeExpenseSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// module.exports = mongoose.model('User', userSchema);
export default mongoose.model('IncomeExpenseInfo', incomeExpenseSchema);
