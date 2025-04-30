import SuggestedMenu from '../models/SuggestedMenu.js'; // Changed import
import User from '../models/User.js';

export const getMenuSuggestions = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('preferences');
    
    if (!user?.preferences) {
      return res.status(400).json({ message: "Complete your profile preferences first" });
    }

    const suggestions = await SuggestedMenu.find({ // Changed model name
      cuisine: user.preferences.cuisine,
      spicyLevel: user.preferences.spicyLevel,
      cheeseLover: user.preferences.cheeseLover
    }).select('name -_id'); // Only returns menu names

    res.json(suggestions.length ? suggestions : ["No matching menus found"]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};