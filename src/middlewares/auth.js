module.exports = {
  isAdmin: async (request, response, next) => {
    if (request.user.scope !== 'ADMIN') return response.reply({ statusCode: 401 });
    next();
  },
  isAdminOrSelf: async (request, response, next) => {
    if (request.user.scope !== 'admin' || request.params.id !== request.user._id) return response.reply({ statusCode: 401 });

    if (request.user.scope === 'admin') request.isAdmin = true;
    next();
  },
};
