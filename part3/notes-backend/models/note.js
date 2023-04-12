const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((_res) => console.log("connected to MongoDB"))
  .catch((err) => console.log("error connecting to mongodb", err));

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (_document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
