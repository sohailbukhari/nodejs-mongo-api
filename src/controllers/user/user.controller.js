import { User } from '../../models';
import { lock } from '../../utils/locker';

export const create = async (args, isAdmin = false) => {
  const count = await User.countDocuments();

  if (count === 0) {
    args.scope = 'ADMIN';
  } else if (!isAdmin) {
    args.scope = 'USER';
  }

  return User.create(args);
};

export const update = async ({ id, args, isAdmin }) => {
  if (!isAdmin) delete args['scope'];
  return User.findOneAndUpdate({ _id: id }, args, { new: true });
};

export const signin = async (args) => {
  const user = await User.findOne(args);
  if (!user) throw { status: 401 };
  return lock(user.toJSON());
};
