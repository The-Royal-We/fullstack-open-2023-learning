const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.1iijure.mongodb.net/testNoteApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);

mongoose
  .connect(url)
  .then(() => {
    const noteSchema = new mongoose.Schema({
      content: String,
      important: Boolean,
    });

    const Note = mongoose.model('Note', noteSchema);

    const newNote = new Note({
      content: 'HTML is easy',
      important: true,
    });

    newNote.save().then((response) => {
      console.log(response);
      mongoose.connection.close();
    });
  })
  .catch((err) => console.log('err', err));
