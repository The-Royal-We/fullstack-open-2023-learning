const PersonLine = ({ name, number }) => (
  <li>
    {name} - {number}
  </li>
);

const NumberList = ({ persons, searchFilter }) => {
  return (
    <div>
      <ul>
        {persons
          .filter(({ name }) => name.toLowerCase().includes(searchFilter))
          .map(({ name, number }) => (
            <PersonLine key={name} name={name} number={number} />
          ))}
      </ul>
    </div>
  );
};

export default NumberList;
