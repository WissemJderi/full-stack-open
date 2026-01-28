type Categories = "Underweight" | "Normal range" | "Overweight" | "Obese";

export const calculateBmi = (height: number, weight: number): Categories => {
  const heightInM = height / 100;
  const bmi: number = weight / (heightInM * heightInM);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal range";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

if (require.main === module) {
  try {
    const height = Number(process.argv[2]);
    const weight = Number(process.argv[3]);

    if (isNaN(height) || isNaN(weight))
      throw new Error("Malformatted parameters");

    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
