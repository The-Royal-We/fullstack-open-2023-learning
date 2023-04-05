const Header = ({ course }) => <h1>{course.name}</h1>;

const Total = ({ course }) => {
  const { parts } = course;
  return (
    <p>
      Number of exercises{" "}
      {parts.reduce(
        (currentSum, currentPart) => currentSum + currentPart.exercises,
        0
      )}
    </p>
  );
};

const Content = ({ course }) => {
  const { parts } = course;
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Part = ({ part }) => {
  const { name, exercises } = part;
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        id: 1,
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        id: 2,
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        id: 3,
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    // Possible best practice: Pass same object if possible
    <Course course={course} />
  );
};

export default App;
