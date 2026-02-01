import { useParams } from "react-router-dom";

import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import { Diagnosis, Patient } from "../../types";
import diagnosesService from "../../services/diagnoses";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>({} as Patient);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const id = useParams().id;

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getPatient(id);
      const diagnoses = await diagnosesService.getAll();
      setPatient(patient);
      setDiagnoses(diagnoses);
    };
    fetchPatient();
  }, []);

  const handleEntryAdded = (updatedPatient: Patient) => {
    setPatient(updatedPatient);
  };

  const entryStyle = {
    border: "1px solid black",
    padding: "6px",
    borderRadius: "5px",
    marginTop: "10px",
  };
  return (
    <div>
      <h1>
        {patient.name} : {patient.gender}
      </h1>
      <p>ssh: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <AddEntryForm patientId={id!} onEntryAdded={handleEntryAdded} />
      <strong>entries</strong>
      {patient.entries ? (
        patient.entries.map((entry) => {
          return (
            <div key={entry.id} style={entryStyle}>
              <EntryDetails entry={entry} />
              <ul>
                {entry.diagnosisCodes
                  ? entry.diagnosisCodes.map((d) => {
                      const obj = diagnoses.find((dia) => dia.code === d);
                      const codeName = obj?.name;

                      return (
                        <li key={d}>
                          {d} {codeName}
                        </li>
                      );
                    })
                  : null}
              </ul>
            </div>
          );
        })
      ) : (
        <p>this patient has no entries</p>
      )}
    </div>
  );
};

export default PatientPage;
