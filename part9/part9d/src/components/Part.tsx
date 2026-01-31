import type { CoursePart } from "../App";

interface PartProps {
  part: CoursePart;
}
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};
const Part = (props: PartProps) => {
  switch (props.part.kind) {
    case "basic":
      return (
        <div>
          <h3>
            {props.part.name} {props.part.exerciseCount}
          </h3>
          <p>{props.part.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>
            {props.part.name} {props.part.exerciseCount}
          </h3>
          <p>Group projects: {props.part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>
            {props.part.name} {props.part.exerciseCount}
          </h3>
          <p>{props.part.description}</p>
          <p>
            Background material:
            <a href={props.part.backgroundMaterial}>
              {props.part.backgroundMaterial}
            </a>
          </p>
        </div>
      );

    case "special":
      return (
        <div>
          <h3>
            {props.part.name} {props.part.exerciseCount}
          </h3>
          <p>{props.part.description}</p>
          <p>
            required skills:{" "}
            {props.part.requirements.map((r) => (
              <strong>{r} </strong>
            ))}
          </p>
        </div>
      );
    default:
      return assertNever(props.part);
  }
};

export default Part;
