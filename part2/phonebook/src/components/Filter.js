const Filter = ({ handleFilterInputChange }) => {
  return (
    <div>
      <div>
        filter shown with: <input onChange={handleFilterInputChange} />
      </div>
    </div>
  );
};

export default Filter;
