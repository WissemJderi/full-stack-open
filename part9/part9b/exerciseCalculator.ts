type ratingDescription =
  | "you need discipline"
  | "not too bad but could be better"
  | "keep it up!";

interface Rating {
  rating: number;
  ratingDescription: ratingDescription;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: ratingDescription;
  target: number;
  average: number;
}

interface UserInfo {
  dailyExerciseHours: number[];
  targetAmount: number;
}

const parseArguments = (args: string[]): UserInfo => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const targetAmount = Number(args[2]);
  const dailyExerciseHours = args.slice(3).map((hour) => Number(hour));

  const allAreNumbers =
    !isNaN(targetAmount) && dailyExerciseHours.every((hour) => !isNaN(hour));

  if (allAreNumbers) {
    return {
      dailyExerciseHours,
      targetAmount,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calcDailyAverage = (dailyExercisesHours: number[]): number => {
  return (
    dailyExercisesHours.reduce((acc, curr) => acc + curr, 0) /
    dailyExercisesHours.length
  );
};

const calcTrainingDays = (dailyExercisesHours: number[]): number => {
  return dailyExercisesHours.filter((day) => day > 0).length;
};

const calcRating = (average: number, target: number): Rating => {
  let rating: number;
  let ratingDescription: ratingDescription;

  if (average < target * 0.8) {
    rating = 1;
    ratingDescription = "you need discipline";
  } else if (average < target) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 3;
    ratingDescription = "keep it up!";
  }
  return { rating: rating, ratingDescription: ratingDescription };
};

const calculateExercises = (
  dailyExercisesHours: number[],
  targetAmount: number,
): Result => {
  const dailyAverage: number = calcDailyAverage(dailyExercisesHours);

  const trainingDays: number = calcTrainingDays(dailyExercisesHours);

  const { rating, ratingDescription }: Rating = calcRating(
    dailyAverage,
    targetAmount,
  );

  return {
    periodLength: dailyExercisesHours.length,
    trainingDays: trainingDays,
    success: dailyAverage >= targetAmount,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetAmount,
    average: dailyAverage,
  };
};

try {
  const { dailyExerciseHours, targetAmount } = parseArguments(process.argv);
  console.log(calculateExercises(dailyExerciseHours, targetAmount));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }

  console.log(errorMessage);
}
