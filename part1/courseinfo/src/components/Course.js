const Header = ({ course }) => <h2>{course.name}</h2>;

const Total = ({ course }) => {
  const { parts } = course;
  return (
    <p>
      <b>
        Number of exercises{" "}
        {parts.reduce(
          (currentSum, currentPart) => currentSum + currentPart.exercises,
          0
        )}
      </b>
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

export default Course;
