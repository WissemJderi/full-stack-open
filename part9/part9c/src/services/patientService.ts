import { v1 as uuid } from "uuid";
import data from "../../data/patients";
import { NewPatientEntry, NonSSnEntries, Patient } from "../types";

const getPatients = (): NonSSnEntries[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  data.push(newPatientEntry);
  return newPatientEntry;
};

export default { getPatients, addPatient };
