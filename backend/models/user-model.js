import mongoose from 'mongoose';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      index: true,
      lowercase: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      unique: true,
      lowercase: true
    },
    hashed_password: {
      type: String,
      required: true
    },
    sub: {
      type: Boolean,
      default: true,
      required:true
    },
    salt: String,
    role: {
      type: Number,
      default: 1
      // 0 = Admin & 1 = users
    }
  },
  { timestamps: true }
);

UserSchema.virtual('password')
  .set(function (password) {
    // create a temporary variable _password
    this.hashed_password = password;

    // generate salt
    this.salt = this.makeSalt();

    // encrypt password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this.hashed_password;
  });

UserSchema.methods = {
  // when we get the plain password form the client,encrypt the plain password
  // and compare it with the hashed version of it from database
  // if passwords match, authenticate the user
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (error) {
      console.error(error);
      return '';
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  }
};

let User = mongoose.model('User', UserSchema);
export default User