import type { Diary } from "../App";

interface DiaryEntriesProps {
  diaries: Diary[];
}
const DiaryEntries = (props: DiaryEntriesProps) => {
  return (
    <>
      <h1>Diary entries</h1>
      {props.diaries.map((diary) => (
        <div key={diary.id}>
          <h2>{diary.date}</h2>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </>
  );
};

export default DiaryEntries;
