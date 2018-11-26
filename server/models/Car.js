const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CarSchema = new Schema({
  plateNo: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true
  }, 
  nationality: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
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

CarSchema.index({
  '$**': 'text'
});

module.exports = mongoose.model('Car', CarSchema);
