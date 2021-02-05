const indexRouter = require('../routes');
const usersRouter = require('../routes/users');

module.exports = (app) => {
  app.use('/', indexRouter);
  app.use('/users', usersRouter);
};
