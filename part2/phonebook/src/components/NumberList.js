const PersonLine = ({ name, number, id, onDeleteHandler }) => (
  <li>
    {name} - {number}
    <button onClick={onDeleteHandler(id, name)}>Delete</button>
  </li>
);

const NumberList = ({ persons, searchFilter, onDeleteHandler }) => {
  return (
    <div>
      <ul>
        {persons
          .filter(({ name }) => name.toLowerCase().includes(searchFilter))
          .map(({ name, number, id }) => (
            <PersonLine
              key={name}
              name={name}
              number={number}
              id={id}
              onDeleteHandler={onDeleteHandler}
            />
          ))}
      </ul>
    </div>
  );
};

export default NumberList;
