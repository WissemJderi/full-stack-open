import type { CoursePart } from "../App";
import Part from "./Part";

interface ContentProps {
  content: CoursePart[];
}
const Content = (props: ContentProps) => {
  return (
    <div>
      {props.content.map((p, i) => (
        <Part key={i} part={p} />
      ))}
    </div>
  );
};

export default Content;
