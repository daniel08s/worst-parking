const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Post = require('../models/Post');

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
    getCurrentUser: async (root, args, { currentUser }) => {
      if (!currentUser){
        return null;
      }
      const user = await User.findOne({ username: currentUser.username });
      return user;
    },
    getAllPosts: async (root, args) => {
      return await Post.find().sort({ createdDate: 'desc' });
    },
    getPost: async (root, { _id }) => {
      return await Post.findById({ _id });
    },
    getRandomPost: async (root, args) => {
      const [post] = await Post.aggregate().sample(1);
      return post;
    },
    searchPosts: async (root, { searchTerm }) => {
      if (searchTerm) {
        const searchResults = await Post
          .find(
            {
              $text: { $search: searchTerm },
            },
            {
              score: { $meta: "textScore" },
            }
          )
          .sort(
            {
              score: { $meta: "textScore" },
            }
          );
        return searchResults;
      } else {
        const Posts = await Post.find().sort({ likes: 'desc', createdDate: 'desc' });
        return Posts;
      }
    },
    getUserPosts: async (root, { username }) => {
      return await Post.find({ username }).sort({ createdDate: 'desc' });
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
    addPost: async (root, { imageUrl, nationality, description, brand, tags, username }) => {
      const post = await Post.findOne({ imageUrl });
      if (post) {
        throw new Error('Duplicated images are not allowed.')
      }
      const newPost = await new Post({
        imageUrl,
        nationality,
        description,
        brand,
        tags,
        username,
      }).save();
      return newPost;
    },
    likePost: async (root, { _id, username }) => {
      const post = await Post.findOneAndUpdate(
        { _id },
        { $inc: { likes: 1 } },
      );
      await User.findOneAndUpdate(
        { username },
        { $addToSet: { favorites: _id } },
      );
      return post;
    },
    unlikePost: async (root, { _id, username }) => {
      const post = await Post.findOneAndUpdate(
        { _id },
        { $inc: { likes: -1 } },
      );
      await User.findOneAndUpdate(
        { username },
        { $pull: { favorites: _id } },
      );
      return post;
    },
    updateUserPost: async (root, { _id, imageUrl, nationality, description, brand, tags }) => {
      const post = await Post.findOneAndUpdate(
        { _id },
        { $set: { imageUrl, nationality, description, brand, tags } },
        { new: true },
      );
      return post;
    },
    deleteUserPost: async (root, { _id }) => {
      await Post.findOneAndRemove({ _id });
    },
  }
};