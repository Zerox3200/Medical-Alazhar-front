import { casesList, epasList } from "./casesData";
import { proceduresList, performanceLevels } from "./proceduresData";

/* List of Rounds and Units */
export const rounds = [
  { value: "surgery", label: "General Surgery" },
  { value: "pediatrics", label: "Pediatrics" },
  { value: "medicine", label: "Internal Medicine" },
  { value: "obsGyn", label: "Obstetrics and Gynecology" },
  { value: "Urosurgery", label: "Urosurgery" },
  { value: "Emergency", label: "Emergency" },
  { value: "Psychatry", label: "Psychatry" },
  { value: "Family Medicine", label: "Family Medicine" },
  { value: "ICU & Anesthesia", label: "ICU & Anesthesia" },
  { value: "Neurology", label: "Neurology" },
  { value: "ENT", label: "ENT" },
  { value: "Ophthalmology", label: "Ophthalmology" },
  { value: "Dermatology", label: "Dermatology" },
  { value: "Rheumatology", label: "Rheumatology" },
  { value: "Radiology", label: "Radiology" },
  { value: "Cardiology", label: "Cardiology" },
  { value: "Orthopedics", label: "Orthopedics" },
  { value: "Clinical Pathology", label: "Clinical Pathology" },
];

const trainingData = {
  rounds,
  cases: { casesList, epasList },
  procedures: { proceduresList, performanceLevels },
};

export default trainingData;
