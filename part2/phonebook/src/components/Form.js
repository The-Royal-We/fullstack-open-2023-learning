const Form = (props) => {
  const {
    handleOnSubmit,
    handleNameInputChange,
    handleNumberInputChange,
    newName,
    newNumber,
  } = props;
  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        name: <input onChange={handleNameInputChange} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumberInputChange} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
