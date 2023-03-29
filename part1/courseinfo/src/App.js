const Header = ({ course }) => <h1>{course.name}</h1>;

const Total = ({ course }) => {
  const { parts } = course;
  return (
    <p>
      Number of exercises{" "}
      {parts.reduce(
        (accumulator, currentPart) => accumulator + currentPart.exercises,
        0
      )}
    </p>
  );
};

const Content = ({ course }) => {
  const { parts } = course;
  return (
    <div>
      {/* Follow KISS principle: There's only ever going to be 3 parts so code approps */}
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
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

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    // Possible best practice: Pass same object if possible
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
