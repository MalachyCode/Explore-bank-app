import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  createdOn: Date,
  type: String,
  accountNumber: Number,
  cashier: String,
  amount: Number,
  oldBalance: Number,
  newBalance: Number,
  description: String,
});

transactionSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// module.exports = mongoose.model('User', userSchema);
export default mongoose.model('Transaction', transactionSchema);
