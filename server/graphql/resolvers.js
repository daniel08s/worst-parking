const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Car = require('../models/Car');

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    getAllUsers: async (root, args) => {
      return await User.find();
    },
    getUser: async (root, { username }) => {
      return await User.findOne({ username });
    },
    getCurrentUser: async (root, { currentUser }) => {
      if (!currentUser){
        return null;
      }
      const user = await User.findOne({ username: currentUser.username });
      return user;
    },
    getAllCars: async (root, args) => {
      return await Car.find();
    },
    getCar: async (root, { _id }) => {
      return await Car.findById({ _id });
    },
    searchCar: async (root, { searchTerm }) => {
      if (searchTerm) {
        const searchResults = await Car.find({
          $text: { $search: searchTerm },
        },
        {
          score: { $meta: "textScore" },
        }).sort({
          score: { $meta: "textScore" },
        });
        return searchResults;
      } else {
        const cars = await Car.find().sort({ likes: 'desc', createdDate: 'desc' });
        return cars;
      }
    },
    getUserCars: async (root, { username }) => {
      return await Car.find({ username }).sort({ createdDate: 'desc' });
    },
  },
  Mutation: {
    registerUser: async (root, { username, email, password }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error('User already exists.');
      }
      const newUser = await new User({
        username,
        email,
        password,
      }).save();
      return { token: createToken(newUser, process.env.SECRET, '1hr') };
    },
    signinUser: async (root, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error(`User (${username}) does not exist.`);
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }
      return { token: createToken(user, process.env.SECRET, '1hr') };
    },
    addCar: async (root, { plateNo, imageUrl, nationality, location, brand, tags, username }) => {
      const car = await Car.findOne({ imageUrl });
      if (car) {
        throw new Error('Duplicated images are not allowed.')
      }
      const newCar = await new Car({
        plateNo,
        imageUrl,
        nationality,
        location,
        brand,
        tags,
        username,
      }).save();
      return newCar;
    },
    likeCar: async (root, { _id, username }) => {
      const car = await Car.findOneAndUpdate(
        { _id },
        { $inc: { likes: 1 } },
      );
      await User.findOneAndUpdate(
        { username },
        { $addToSet: { favorites: _id } },
      );
      return car;
    },
    unlikeCar: async (root, { _id, username }) => {
      const car = await Car.findOneAndUpdate(
        { _id },
        { $inc: { likes: -1 } },
      );
      await User.findOneAndUpdate(
        { username },
        { $pull: { favorites: _id } },
      );
      return car;
    },
    updateUserCar: async (root, { _id, plateNo, imageUrl, nationality, location, brand, tags }) => {
      const car = await Car.findOneAndUpdate(
        { _id },
        { $set: { plateNo, imageUrl, nationality, location, brand, tags } },
        { new: true },
      );
      return car;
    },
    deleteUserCar: async (root, { _id }) => {
      await Car.findOneAndRemove({ _id });
    },
  }
};