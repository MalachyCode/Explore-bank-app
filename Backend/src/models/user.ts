import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

if (url) {
  console.log('connecting to', url);

  mongoose
    .connect(url)

    .then((_result: any) => {
      console.log('connected to MongoDB');
    })
    .catch((error: { message: any }) => {
      console.log('error connecting to MongoDB:', error.message);
    });
}

const userSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  middleName: String,
  password: String,
  type: String,
  isAdmin: Boolean,
  number: String,
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
