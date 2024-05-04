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

  const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercises}
      </p>
    );
  };
  const Header = (props) => {
    return (
      <>
        <h1>{props.course.name}</h1>
      </>
    );
  };
  const Content = (props) => {
    const part = props.course.parts 
    return (
      <div>
        <Part part={part[0].name} exercises={part[0].exercises} />
        <Part part={part[1].name} exercises={part[1].exercises} />
        <Part part={part[2].name} exercises={part[2].exercises} />
      </div>
    );
  };
  const Total = (props) => {
    const part = props.course.parts 
    return (
      <p>
        Number of exercises{" "}
        {part[0].exercises + part[1].exercises + part[2].exercises }
      </p>
    );
  };

  return (
    <div>
      <Header course={course} />
      <Content
        course={course}
      />
      <Total
        course={course}
      />
    </div>
  );
};

export default App;
