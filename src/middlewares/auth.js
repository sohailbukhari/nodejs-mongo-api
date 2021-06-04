module.exports = {
  isAdmin: async (request, response, next) => {
    if (request.user.scope !== 'ADMIN') return response.reply({ statusCode: 401 });
    next();
  },
};
