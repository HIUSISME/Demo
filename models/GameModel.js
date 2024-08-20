const mongoose = require('mongoose')
const GameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50
    },
    genre: String,
    price: {
      type: Number,
      required: true,
      min: [1, 'Lowest price must be 1$'],
      max: 1000
    },
    cover: String,
    //1 developer - many games
    developer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'developers'    //name of referenced collection (table)
    }
  },
  {
    versionKey: false
  }
)
const GameModel = mongoose.model('games', GameSchema)  //games: table name
module.exports = GameModel