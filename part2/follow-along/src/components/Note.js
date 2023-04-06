const Note = ({ note, toggleImportance }) => {
  const { content, important } = note;
  const label = important ? "make not important" : "make important";

  return (
    <li className="notes">
      {content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;
