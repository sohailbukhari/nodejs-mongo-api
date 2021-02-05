const mongoose = require('mongoose');
const { mongodb } = require('./keys');

mongoose
  .connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Success: Mongodb'))
  .catch((error) => console.log(error));

module.exports = mongoose.connection;
