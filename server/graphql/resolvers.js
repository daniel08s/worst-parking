const User = require('../models/User');
const Car = require('../models/Car');

exports.resolvers = {
  Query: {
    getAllUsers: async (root, args) => {
      return await User.find();
    },
  }
};