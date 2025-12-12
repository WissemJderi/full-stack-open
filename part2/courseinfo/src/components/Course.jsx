const Header = ({ title }) => <h1>{title}</h1>;

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => {
        return <Part key={part.id} data={part} />;
      })}
    </div>
  );
};
const Part = ({ data }) => (
  <p>
    {data.name} {data.exercises}
  </p>
);

const Total = ({ parts }) => {
  const total = parts.reduce((previous, current) => {
    return previous + current.exercises;
  }, 0);
  return <p>total of {total} exercises</p>;
};
const Course = ({ course }) => {
  return (
    <>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
