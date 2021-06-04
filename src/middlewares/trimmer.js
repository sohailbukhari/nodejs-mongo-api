module.exports = {
  trim: (validator) => async (request, response, next) => {
    request.body = validator.body ? validator.body.validate(request.body).value : request.body;
    request.params = validator.params ? validator.params.validate(request.params).value : request.params;
    request.query = validator.query ? validator.query.validate(request.query).value : request.query;
    next();
  },
};
