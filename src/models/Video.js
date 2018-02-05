const mongoose = require('mongoose')

const VideoSchema = new mongoose.Schema({
  title: String,
  season: Number,
  episode: Number,
  publisher: String
}, { timestamps: false, collection: 'videos' })

mongoose.model('Video', VideoSchema)
