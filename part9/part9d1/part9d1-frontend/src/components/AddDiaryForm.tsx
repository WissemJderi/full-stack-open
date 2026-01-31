import { useState } from "react";
import { addDiary } from "../diaryService";
import type { Diary, Visibility, Weather } from "../App";
import axios from "axios";
interface AddDiaryFormProps {
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
  setNotification: React.Dispatch<React.SetStateAction<string>>;
}

const AddDiaryForm = (props: AddDiaryFormProps) => {
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<Visibility>("ok");
  const [weather, setWeather] = useState<Weather>("sunny");
  const [comment, setComment] = useState<string>("");

  const onFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const newDiary = await addDiary({ date, visibility, weather, comment });
      props.setDiaries((prev) => [...prev, newDiary]);
      setDate("");
      setVisibility("ok");
      setWeather("sunny");
      setComment("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        props.setNotification(error.response?.data);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h1>Add new entry</h1>
      <form onSubmit={onFormSubmit}>
        <label>
          date
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </label>
        <label>
          visibility
          {(["great", "good", "ok", "poor"] as Visibility[]).map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={visibility === option}
                onChange={() => setVisibility(option)}
              />
              {option}
            </label>
          ))}
        </label>

        <label>
          weather
          {(["sunny", "rainy", "cloudy", "stormy", "windy"] as Weather[]).map(
            (option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="weather"
                  value={option}
                  checked={weather === option}
                  onChange={() => setWeather(option)}
                />
                {option}
              </label>
            ),
          )}
        </label>
        <label>
          comment
          <input
            type="text"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
        </label>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default AddDiaryForm;
