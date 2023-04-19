const NoteForm = ({ handleOnSubmit, value, handleNoteChange }) => (
  <form onSubmit={handleOnSubmit}>
    <input value={value} onChange={handleNoteChange} />
    <button type="submit">save</button>
  </form>
);

export default NoteForm;
