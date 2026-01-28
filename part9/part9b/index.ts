import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const bmiCategory = calculateBmi(height, weight);

  return res.send({
    weight,
    height,
    bmi: bmiCategory,
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
