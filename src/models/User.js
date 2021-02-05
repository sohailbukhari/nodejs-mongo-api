import mongoose from 'mongoose';
import common from '../utils/common';
import { ENUMS } from '../controllers/user/user.validator';
import options from './options';
import mongoosePaginate from 'mongoose-paginate-v2';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: { type: String, required: true, set: common.hash },
    scope: { type: String, default: 'USER', enum: ENUMS.SCOPES },
    attributes: { type: Object, default: [] },
  },
  options
);

userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.methods.checkPassword = async function (password) {
  if (common.hash(password) === this.password) {
    console.log(this);
    return this;
  }
  throw { status: 401 };
};

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', userSchema);
