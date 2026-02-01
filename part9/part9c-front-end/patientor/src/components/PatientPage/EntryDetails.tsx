import { Entry } from "../../types";

interface EntryDetailsProps {
  entry: Entry;
}
const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const EntryDetails = (props: EntryDetailsProps) => {
  switch (props.entry.type) {
    case "Hospital":
      return (
        <div>
          <p>{props.entry.date}</p>
          <p>{props.entry.description}</p>
          <p>{props.entry.discharge.criteria}</p>
          <p>
            discharge: {props.entry.discharge.date} –
            {props.entry.discharge.criteria}
          </p>
        </div>
      );
    case "HealthCheck":
      return (
        <div>
          <p>{props.entry.date}</p>
          <p>{props.entry.description}</p>
          <p>health rating: {props.entry.healthCheckRating}</p>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <p>{props.entry.date}</p>
          <p>{props.entry.description}</p>
          <p>employer: {props.entry.employerName}</p>
        </div>
      );
    default:
      return assertNever(props.entry);
  }
};

export default EntryDetails;
