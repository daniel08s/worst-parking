const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  imageUrl: {
    type: String,
    required: true
  }, 
  nationality: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  brand: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  tags: {
    type: String,
  },
  submitDate: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  }
});

PostSchema.index({
  '$**': 'text'
});

module.exports = mongoose.model('Post', PostSchema);
