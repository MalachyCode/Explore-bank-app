import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  balance: {
    type: Number,
    required: true,
  },
  createdOn: Date,
  owner: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  accountNumber: Number,
  type: String,
});

accountSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// module.exports = mongoose.model('User', userSchema);
export default mongoose.model('Account', accountSchema);
