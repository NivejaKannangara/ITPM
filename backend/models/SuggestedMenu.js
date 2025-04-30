import mongoose from 'mongoose';

const suggestedMenuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cuisine: {
    type: String,
    required: true,
    enum: ["Thai", "Chinese", "Italian", "Indian"] 
  },
  spicyLevel: {
    type: String,
    required: true,
    enum: ["Mild", "Medium", "Spicy"] 
  },
  cheeseLover: {
    type: Boolean,
    required: true 
  }
});

export default mongoose.model('SuggestedMenu', suggestedMenuSchema);