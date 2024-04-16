import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  owner: String,
  newNotifications: [
    {
      message: {
        type: String,
        minLength: 3,
        required: true,
      },
      accountId: String,
      accountNumber: Number,
      transactionId: String,
    },
  ],
  oldNotifications: [
    {
      message: String,
      accountId: String,
      accountNumber: Number,
      transactionId: String,
    },
  ],
});

notificationSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// module.exports = mongoose.model('User', userSchema);
export default mongoose.model('Notification', notificationSchema);
