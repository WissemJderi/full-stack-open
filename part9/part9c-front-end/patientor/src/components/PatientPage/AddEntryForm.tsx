import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import { Patient, Diagnosis } from "../../types";
import diagnosesService from "../../services/diagnoses";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

interface AddEntryFormProps {
  patientId: string;
  onEntryAdded: (updatedPatient: Patient) => void;
}

type EntryType = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

const AddEntryForm = ({ patientId, onEntryAdded }: AddEntryFormProps) => {
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagCodes, setDiagCodes] = useState<Diagnosis[]>([]);
  const [allDiagnoses, setAllDiagnoses] = useState<Diagnosis[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [healthCheckRating, setHealthCheckRating] = useState<number | null>(0);

  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");

  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStart, setSickLeaveStart] = useState<string>("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState<string>("");

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setAllDiagnoses(diagnoses);
    };
    fetchDiagnoses();
  }, []);

  const resetForm = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setDiagCodes([]);
    setHealthCheckRating(0);
    setDischargeDate("");
    setDischargeCriteria("");
    setEmployerName("");
    setSickLeaveStart("");
    setSickLeaveEnd("");
    setError(null);
  };

  const buildEntry = () => {
    const base = {
      type: entryType,
      description,
      date,
      specialist,
      diagnosisCodes: diagCodes.map((d) => d.code),
    };

    switch (entryType) {
      case "HealthCheck":
        return { ...base, healthCheckRating };
      case "Hospital":
        return {
          ...base,
          discharge: { date: dischargeDate, criteria: dischargeCriteria },
        };
      case "OccupationalHealthcare":
        return {
          ...base,
          employerName,
          ...(sickLeaveStart && sickLeaveEnd
            ? {
                sickLeave: {
                  startDate: sickLeaveStart,
                  endDate: sickLeaveEnd,
                },
              }
            : {}),
        };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await patientService.addEntry(patientId, buildEntry());
      onEntryAdded(data);
      resetForm();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  const entryTypes: EntryType[] = [
    "HealthCheck",
    "Hospital",
    "OccupationalHealthcare",
  ];

  const ratingLabels: { [index: number]: string } = {
    0: "Healthy",
    1: "LowRisk",
    2: "HighRisk",
    3: "CriticalRisk",
  };

  return (
    <Box
      sx={{
        border: "1px dashed black",
        padding: 2,
        marginY: 2,
      }}
    >
      <strong>New {entryType} Entry</strong>

      {error && (
        <Alert severity="error" sx={{ my: 1 }}>
          {error}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
      >
        <TextField
          select
          label="Entry Type"
          value={entryType}
          onChange={(e) => setEntryType(e.target.value as EntryType)}
        >
          {entryTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Specialist"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        />

        <Autocomplete
          multiple
          options={allDiagnoses}
          getOptionLabel={(option) => `${option.code} - ${option.name}`}
          value={diagCodes}
          onChange={(_e, newValue) => setDiagCodes(newValue)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option.code}
                {...getTagProps({ index })}
                key={option.code}
              />
            ))
          }
          renderOption={(props, option) => (
            <li {...props} key={option.code}>
              <strong>{option.code}</strong>&nbsp;- {option.name}
            </li>
          )}
          isOptionEqualToValue={(option, value) => option.code === value.code}
          filterSelectedOptions
          placeholder="Search codes..."
          renderInput={(params) => (
            <TextField {...params} label="Diagnosis Codes" />
          )}
        />

        {entryType === "HealthCheck" && (
          <Box>
            <label>
              HealthCheck Rating:{" "}
              <strong>
                {healthCheckRating !== null
                  ? ratingLabels[healthCheckRating]
                  : ""}
              </strong>
            </label>
            <Rating
              name="healthCheckRating"
              value={healthCheckRating}
              max={3}
              onChange={(_e, newValue) => setHealthCheckRating(newValue)}
              getLabelText={(value) => ratingLabels[value]}
            />
          </Box>
        )}

        {entryType === "Hospital" && (
          <>
            <TextField
              label="Discharge Date"
              type="date"
              value={dischargeDate}
              onChange={(e) => setDischargeDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Discharge Criteria"
              value={dischargeCriteria}
              onChange={(e) => setDischargeCriteria(e.target.value)}
            />
          </>
        )}

        {entryType === "OccupationalHealthcare" && (
          <>
            <TextField
              label="Employer Name"
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
            />
            <TextField
              label="Sick Leave Start"
              type="date"
              value={sickLeaveStart}
              onChange={(e) => setSickLeaveStart(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Sick Leave End"
              type="date"
              value={sickLeaveEnd}
              onChange={(e) => setSickLeaveEnd(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </>
        )}

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="contained" color="error" onClick={resetForm}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddEntryForm;
