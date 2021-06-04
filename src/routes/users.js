import express from 'express';
import { unlock } from '../utils/locker';
import { validate } from 'express-validation';
import * as userController from '../controllers/user/user.controller';
import * as userValidator from '../controllers/user/user.validator';
import * as crudHelper from '../utils/crud.helper';
import { User } from '../models';
import { trim } from '../middlewares/trimmer';
import { isAdmin, isAdminOrSelf } from '../middlewares/auth';

const router = express.Router();

router.get('/me', unlock, async function (req, res, next) {
  try {
    return res.reply({ data: req.user });
  } catch (err) {
    return next(err);
  }
});

router.post('/signup', validate(userValidator.create), trim(userValidator.create), async function (req, res, next) {
  try {
    return res.reply({ data: await userController.create(req.body) });
  } catch (err) {
    return next(err);
  }
});

router.post('/signin', validate(userValidator.signin), trim(userValidator.signin), async function (req, res, next) {
  try {
    return res.reply({ data: await userController.signin(req.body) });
  } catch (err) {
    return next(err);
  }
});

router.get('/', unlock, validate(userValidator.list), trim(userValidator.list), async function (req, res, next) {
  try {
    res.reply({
      data: await crudHelper.list({ Model: User, args: req.query }),
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', unlock, validate(userValidator.single), trim(userValidator.single), async function (req, res, next) {
  try {
    res.reply({
      data: await crudHelper.single({ Model: User, id: req.params.id }),
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', unlock, isAdmin, validate(userValidator.create), trim(userValidator.create), async function (req, res, next) {
  try {
    res.reply({
      data: await crudHelper.create({ Model: User, args: req.body }),
    });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', unlock, isAdminOrSelf, validate(userValidator.update), trim(userValidator.update), async function (req, res, next) {
  try {
    return res.reply({
      data: await userController.update({ id: req.params.id, args: req.body, isAdmin: req.isAdmin }),
    });
  } catch (err) {
    return next(err);
  }
});

router.delete('/:id', unlock, isAdmin, validate(userValidator.single), trim(userValidator.single), async function (req, res, next) {
  try {
    if (req.user._id === req.params.id) throw { status: 403 }; // self cleanup
    res.reply({
      data: await crudHelper.remove({ Model: User, id: req.params.id }),
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
