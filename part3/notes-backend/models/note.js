const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    // },
  },
  important: Boolean,
});

noteSchema.set('toJSON', {
  transform: (_document, returnedObj) => {
    const { content, important, _id } = returnedObj;
    return {
      content,
      important,
      id: _id.toString(),
    };
  },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
