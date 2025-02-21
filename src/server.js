const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
const port = 3000;
app.use(cors());


app.use(express.json());


const uri = "mongodb://localhost:27017/Recipe-dataset";


mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Failed to connect to MongoDB:", err));


const recipeSchema = new mongoose.Schema({
  name: String,
  cookingTime: String,
  ingredients: [String],
  instructions: String,
  image: String
});


const Recipe = mongoose.model('Recipe', recipeSchema);


app.get('/api/recipes/search', async (req, res) => {
  const { vegetables } = req.query;

  if (!vegetables) {
    return res.status(400).json({ error: 'Please provide some vegetables for the search' });
  }

  try {
    
    const recipes = await Recipe.find({
      ingredients: { $regex: vegetables, $options: 'i' }
    });

    if (recipes.length > 0) {
      res.json(recipes);
    } else {
      res.status(404).json({ error: 'No recipes found for the given vegetables' });
    }
  } catch (err) {
    console.error('Error fetching recipes:', err);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
