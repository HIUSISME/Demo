const mongoose = require('mongoose')
const DeveloperSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true
      }
   }
)
const DeveloperModel = mongoose.model('publishers', DeveloperSchema)
module.exports = DeveloperModel