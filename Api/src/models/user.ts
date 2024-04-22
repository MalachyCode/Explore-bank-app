import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    minLength: 5,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    minLength: 2,
    required: true,
  },
  lastName: {
    type: String,
    minLength: 2,
    required: true,
  },
  middleName: String,
  password: {
    type: String,
    minLength: 3,
    required: true,
  },
  type: String,
  isAdmin: Boolean,
  number: {
    type: String,
    minLength: 11,
    required: true,
  },
  dob: String,
  transferPin: String,
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// module.exports = mongoose.model('User', userSchema);
export default mongoose.model('User', userSchema);
