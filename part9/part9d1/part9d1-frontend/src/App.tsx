import { useEffect, useState } from "react";
import DiaryEntries from "./components/DiaryEntries";
import AddDiaryForm from "./components/AddDiaryForm";
import { getDiaries } from "./diaryService";
import Notification from "./components/Notification";

export type Visibility = "great" | "good" | "ok" | "poor";

export type Weather = "sunny" | "rainy" | "cloudy" | "stormy" | "windy";

export interface Diary {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [notification, setNotification] = useState<string>("");

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDiaries();
        setDiaries(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Notification text={notification} />
      <AddDiaryForm setDiaries={setDiaries} setNotification={setNotification} />
      <DiaryEntries diaries={diaries} />
    </>
  );
}

export default App;
