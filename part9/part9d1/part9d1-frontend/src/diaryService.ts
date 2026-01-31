import axios from "axios";
import type { Diary } from "./App";
type NewDiary = Omit<Diary, "id">;

const baseUrl = "http://localhost:3000/api/diaries";

export const getDiaries = async () => {
  const response = await axios.get<Diary[]>(baseUrl);
  return response.data;
};

export const addDiary = async (data: NewDiary): Promise<Diary> => {
  const response = await axios.post<Diary>(baseUrl, data);
  return response.data;
};
