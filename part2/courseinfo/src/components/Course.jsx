import React from "react";

export default function Course({ courses }) {
  const Header = ({ course }) => {
    return <h1>{course.name}</h1>;
  };
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map((part) => {
          return <Part key={part.id} part={part} />;
        })}
      </div>
    );
  };
  const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    );
  };
  const Total = ({ course }) => {
    const exercise = course.parts.map((part) => part.exercises);
    const sum = exercise.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return <strong>total of {sum} exercises</strong>;
  };


  return (
    <div>
      <Header course={courses} />
      <Content course={courses} />
      <Total course={courses} />
      
    </div>
  );
}
